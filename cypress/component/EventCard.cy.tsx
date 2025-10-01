import EventCard from '../../src/components/EventCard';
import { Event } from '../../src/lib/data';

describe('<EventCard />', () => {
  it('renders', () => {
    const event: Event = {
      id: '1',
      title: 'Adoption Day',
      date: '2024-09-15T10:00:00Z',
      location: '123 Main St, Anytown, USA',
      description: 'Come meet our adorable animals and find your new best friend!',
      image: '/placeholder.svg',
      type: 'Adoption Drive'
    };
    cy.mount(<EventCard event={event} />);
    cy.contains('h3', 'Adoption Day').should('be.visible');
  });
});
