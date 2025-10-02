import { testimonials } from "../../src/lib/data";

describe("Testimonials Carousel E2E", () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit("/");
    // Use cy.clock() to control setInterval for the carousel
    cy.clock();
  });

  it("should display the testimonials section and the first testimonial", () => {
    // Check that the section title exists
    cy.contains("Happy Tails").should("be.visible");

    // Check for the first testimonial's content
    cy.contains("h3", testimonials[0].name).should("be.visible");
    cy.contains("p", testimonials[0].text).should("be.visible");
  });

  it("should navigate to the next testimonial on button click", () => {
    cy.get('button[aria-label="Next testimonial"]').click({ force: true });
    cy.contains("h3", testimonials[1].name).should("be.visible");
  });

  it("should navigate to the previous testimonial on button click", () => {
    // Go forward first
    cy.get('button[aria-label="Next testimonial"]').click({ force: true });
    cy.contains("h3", testimonials[1].name).should("be.visible");

    // Then go back
    cy.get('button[aria-label="Previous testimonial"]').click({ force: true });
    cy.contains("h3", testimonials[0].name).should("be.visible");
  });

  it("should advance testimonials automatically after 5 seconds", () => {
    // Initial state
    cy.contains("h3", testimonials[0].name).should("be.visible");

    // Advance time
    cy.tick(5000);

    // Check for the second testimonial
    cy.contains("h3", testimonials[1].name).should("be.visible");
  });

  it("should display the correct dot indicator for the current slide", () => {
    // The first dot should be active
    cy.get('button[aria-label="Go to testimonial 1"]').should(
      "have.class",
      "bg-amber-600",
    );
    cy.get('button[aria-label="Go to testimonial 2"]').should(
      "not.have.class",
      "bg-amber-600",
    );

    // Go to the next slide
    cy.get('button[aria-label="Next testimonial"]').click({ force: true });

    // The second dot should be active
    cy.get('button[aria-label="Go to testimonial 1"]').should(
      "not.have.class",
      "bg-amber-600",
    );
    cy.get('button[aria-label="Go to testimonial 2"]').should(
      "have.class",
      "bg-amber-600",
    );
  });
});
