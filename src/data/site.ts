export const site = {
  name: 'DGS',
  fullName: 'DGS — Architectural Glass & Window Systems',
  tagline: 'Architecture framed by light.',
  description: 'Explore architectural windows, glass doors, and installation photography. Discover window systems and start a conversation about your space.',
  url: process.env.NEXT_PUBLIC_SITE_URL || '',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '',
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '',
  address: '',
  socials: [] as {label:string;url:string}[],
  colors: {ivory:'#f4f2eb',charcoal:'#232b27',bronze:'#9f8969'},
  clientRelationshipsConfirmed: false,
  teamIdentitiesConfirmed: false,
  servicesConfirmed: false,
};
export const navigation = [
  {name:'Home',href:'/'}, {name:'Systems',href:'/products/'},
  {name:'Our work',href:'/projects/'}, {name:'About',href:'/about/'},
];
export const faqs = [
  {question:'Where should I begin?',answer:'Start with the space you have in mind. Share a photograph, a drawing, or a short description in your inquiry. You can explore the system collection first if you are still gathering ideas.'},
  {question:'Which window systems can I explore?',answer:'The collection includes clad, gable, louvered and sash windows, alongside sliding profiles. Each page introduces the form and gives you a starting point for discussing suitability.'},
  {question:'Can a system be adapted to my project?',answer:'Dimensions, finishes and opening arrangements need to be discussed against your actual opening and project requirements. Ask about the options for your selected system; availability and specifications must be confirmed individually.'},
  {question:'What should I provide for installation planning?',answer:'Useful starting information includes the opening dimensions, site photographs, intended use, access conditions and preferred timing. Final measurements and installation arrangements require confirmation before work proceeds.'},
  {question:'Are the photographs connected to named projects?',answer:'These are supplied installation photographs. Where project identities have not been confirmed, we use descriptive titles and keep each photograph separate rather than inventing locations, clients or project histories.'},
];
export const processSteps = [
  {title:'Share your vision',text:'A space, a sketch, a better view. Tell us what you have in mind.'},
  {title:'Explore the system',text:'Discuss the opening, the way it will be used, and the visual direction.'},
  {title:'Resolve the details',text:'Confirm dimensions, finishes, specifications and the project scope.'},
  {title:'Plan the next step',text:'Agree on the practical arrangements and timing before proceeding.'},
];
