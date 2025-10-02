import { mount } from "cypress/react18";
import TestimonialsCarousel from "../../src/components/TestimonialsCarousel";

describe("<TestimonialsCarousel />", () => {
  const mockTestimonials = [
    {
      name: "John Doe",
      animal: "Dog",
      text: "The adoption process was amazing!",
      image: "/testimonial1.jpg",
    },
    {
      name: "Jane Smith",
      animal: "Cat",
      text: "Best decision ever!",
      image: "/testimonial2.jpg",
    },
  ];

  beforeEach(() => {
    // Mock the testimonials data
    cy.intercept("GET", "/api/testimonials", { body: mockTestimonials });

    // Mount the component with mock data
    mount(<TestimonialsCarousel />);
  });

  it("renders the initial testimonial correctly", () => {
    // Check the first testimonial is visible
    cy.get("h3").should("contain", mockTestimonials[0].name);
    cy.get("p.text-amber-600").should(
      "contain",
      `Adopted ${mockTestimonials[0].animal}`,
    );
    cy.get("p.italic").should("contain", mockTestimonials[0].text);

    // Verify image is loaded
    cy.get("img")
      .should("be.visible")
      .and("have.attr", "src", mockTestimonials[0].image);
  });

  it("navigates to the next and previous testimonials", () => {
    // Initial testimonial
    cy.get("h3").should("contain", mockTestimonials[0].name);

    // Click Next
    cy.get('button[aria-label="Next testimonial"]').click();
    cy.get("h3").should("contain", mockTestimonials[1].name);
    cy.get("p.text-amber-600").should(
      "contain",
      `Adopted ${mockTestimonials[1].animal}`,
    );

    // Click Previous
    cy.get('button[aria-label="Previous testimonial"]').click();
    cy.get("h3").should("contain", mockTestimonials[0].name);
  });

  it("auto-advances to the next testimonial", () => {
    // Initial testimonial
    cy.get("h3").should("contain", mockTestimonials[0].name);

    // Wait for auto-advance (5000ms in the component) plus buffer
    cy.wait(6000);

    // Should have advanced to next testimonial
    cy.get("h3").should("contain", mockTestimonials[1].name);
  });

  it("updates indicator dots when navigating", () => {
    // First dot should be active initially
    cy.get('button[aria-label^="Go to testimonial"]')
      .first()
      .should("have.class", "w-8")
      .and("have.class", "bg-amber-600");

    // Click next
    cy.get('button[aria-label="Next testimonial"]').click();

    // Second dot should now be active
    cy.get('button[aria-label^="Go to testimonial"]')
      .eq(1)
      .should("have.class", "w-8")
      .and("have.class", "bg-amber-600");
  });

  it("navigates using indicator dots", () => {
    // Click on the second dot
    cy.get('button[aria-label^="Go to testimonial"]').eq(1).click();

    // Should show second testimonial
    cy.get("h3").should("contain", mockTestimonials[1].name);
  });
});
