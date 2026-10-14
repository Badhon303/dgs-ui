"use client";
import { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, Download, Mail, Check } from "lucide-react";
import { products } from "@/data/products";
import { site } from "@/data/site";
type Inquiry = {
  interest: string;
  space: string;
  location: string;
  timing: string;
  name: string;
  email: string;
  phone: string;
  message: string;
};
const empty: Inquiry = {
  interest: "",
  space: "",
  location: "",
  timing: "",
  name: "",
  email: "",
  phone: "",
  message: "",
};
const steps = ["Your interest", "The space", "About you", "Review"];
export function InquiryForm() {
  const [step, setStep] = useState(0),
    [data, setData] = useState<Inquiry>(empty),
    [errors, setErrors] = useState<Record<string, string>>({}),
    [saved, setSaved] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const params = new URLSearchParams(location.search);
      const stored = sessionStorage.getItem("dgs-inquiry");
      let draft: Inquiry = empty;
      try {
        if (stored) draft = { ...empty, ...JSON.parse(stored) };
      } catch {}
      const interest = params.get("interest");
      const message = params.get("project");
      setData({
        ...draft,
        ...(interest ? { interest } : {}),
        ...(message ? { message: `I would like to discuss ${message}.` } : {}),
      });
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  const update = (key: keyof Inquiry, value: string) => {
    const next = { ...data, [key]: value };
    setData(next);
    setSaved(false);
    sessionStorage.setItem("dgs-inquiry", JSON.stringify(next));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };
  const advance = () => {
    const next: Record<string, string> = {};
    if (step === 0 && !data.interest)
      next.interest = "Choose a system or a general project inquiry.";
    if (step === 2) {
      if (!data.name.trim()) next.name = "Please enter your name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        next.email = "Please enter a valid email address.";
      if (!data.message.trim())
        next.message = "Tell us a little about your project.";
    }
    setErrors(next);
    if (!Object.keys(next).length) setStep((s) => Math.min(3, s + 1));
    else
      setTimeout(
        () =>
          document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
        0,
      );
  };
  const summary = `DGS project inquiry\n\nInterest: ${data.interest}\nSpace: ${data.space || "Not specified"}\nLocation: ${data.location || "Not specified"}\nTiming: ${data.timing || "To discuss"}\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || "Not provided"}\n\n${data.message}`;
  const download = () => {
    const url = URL.createObjectURL(
      new Blob([summary], { type: "text/plain;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "dgs-project-inquiry.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 500);
    setSaved(true);
  };
  const field = (
    key: keyof Inquiry,
    label: string,
    placeholder: string,
    type = "text",
  ) => (
    <label className="field" key={key}>
      {label}
      {key === "name" || key === "email" ? (
        <span className="required">Required</span>
      ) : (
        <span className="optional">Optional</span>
      )}
      <input
        type={type}
        value={data[key]}
        placeholder={placeholder}
        onChange={(e) => update(key, e.target.value)}
        autoComplete={
          key === "name"
            ? "name"
            : key === "email"
              ? "email"
              : key === "phone"
                ? "tel"
                : undefined
        }
        aria-invalid={!!errors[key]}
        aria-describedby={errors[key] ? `${key}-error` : undefined}
      />
      {errors[key] && (
        <small id={`${key}-error`} className="field-error">
          {errors[key]}
        </small>
      )}
    </label>
  );
  return (
    <form
      className="inquiry"
      onSubmit={(e) => {
        e.preventDefault();
        if (step < 3) advance();
      }}
      noValidate
    >
      <div className="form-stepper" aria-label="Inquiry progress">
        {steps.map((s, i) => (
          <div
            key={s}
            className={i === step ? "current" : i < step ? "complete" : ""}
            aria-current={i === step ? "step" : undefined}
          >
            <span>{i < step ? <Check size={13} /> : i + 1}</span>
            <small>{s}</small>
          </div>
        ))}
      </div>
      <div className="form-body" key={step}>
        <p className="eyebrow">Step 0{step + 1} / 04</p>
        <h2>
          {
            [
              "What are you imagining?",
              "Tell us about your space.",
              "Let’s make an introduction.",
              "Your vision, ready to share.",
            ][step]
          }
        </h2>
        {step === 0 && (
          <>
            <p>
              Choose a starting point. We can work through the details together.
            </p>
            <fieldset className="interest-options">
              <legend className="sr-only">Project or product interest</legend>
              {[...products.map((p) => p.name), "General project inquiry"].map(
                (name) => (
                  <label
                    key={name}
                    className={data.interest === name ? "chosen" : ""}
                  >
                    <input
                      type="radio"
                      name="interest"
                      value={name}
                      checked={data.interest === name}
                      onChange={() => update("interest", name)}
                      aria-describedby={
                        errors.interest ? "interest-error" : undefined
                      }
                    />
                    <span>{name}</span>
                    <ArrowRight size={17} />
                  </label>
                ),
              )}
            </fieldset>
            {errors.interest && (
              <p id="interest-error" className="field-error" role="alert">
                {errors.interest}
              </p>
            )}
          </>
        )}
        {step === 1 && (
          <>
            <p>These details are optional. A rough idea is enough to begin.</p>
            <div className="form-fields">
              {field("space", "Type of space", "Home, workplace, renovation…")}
              {field("location", "Project location", "City or area")}
              {field(
                "timing",
                "Preferred timing",
                "When would you like to start?",
              )}
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <p>Tell us how to reach you and what you would like to explore.</p>
            <div className="form-fields">
              {field("name", "Your name", "Full name")}
              {field("email", "Email address", "you@example.com", "email")}
              {field("phone", "Phone number", "Include country code", "tel")}
              <label className="field">
                Your message<span className="required">Required</span>
                <textarea
                  value={data.message}
                  rows={4}
                  placeholder="A little about your opening, your ideas, or the details you want to discuss…"
                  onChange={(e) => update("message", e.target.value)}
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                />
                {errors.message && (
                  <small id="message-error" className="field-error">
                    {errors.message}
                  </small>
                )}
              </label>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <p>Review your details before sharing your inquiry.</p>
            <dl className="inquiry-review">
              {Object.entries(data)
                .filter(([, v]) => v)
                .map(([key, value]) => (
                  <div key={key}>
                    <dt>{key}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
            </dl>
            <div className="contact-notice">
              {site.email ? (
                <>
                  <Mail size={19} />
                  <p>
                    Your inquiry opens in your email app. Review it there and
                    press send to deliver it to {site.email}.
                  </p>
                </>
              ) : (
                <>
                  <Download size={19} />
                  <p>
                    Online delivery is not available yet. Download your inquiry
                    to keep a copy. No message will be sent.
                  </p>
                </>
              )}
            </div>
            {saved && (
              <p className="download-status" role="status">
                Your inquiry file was downloaded. It has not been sent.
              </p>
            )}
          </>
        )}
      </div>
      <div className="form-bottom">
        {step > 0 ? (
          <button
            type="button"
            className="text-link"
            onClick={() => {
              setStep((s) => s - 1);
              setErrors({});
            }}
          >
            <ArrowLeft size={16} />
            Back
          </button>
        ) : (
          <span className="form-note">
            Your draft stays in this browser tab.
          </span>
        )}
        {step < 3 ? (
          <button type="submit" className="button">
            Continue
            <ArrowRight size={18} />
          </button>
        ) : site.email ? (
          <a
            className="button"
            href={`mailto:${site.email}?subject=${encodeURIComponent(`Project inquiry — ${data.interest}`)}&body=${encodeURIComponent(summary)}`}
          >
            Open email draft
            <Mail size={18} />
          </a>
        ) : (
          <button type="button" className="button" onClick={download}>
            Download inquiry
            <Download size={18} />
          </button>
        )}
      </div>
    </form>
  );
}
