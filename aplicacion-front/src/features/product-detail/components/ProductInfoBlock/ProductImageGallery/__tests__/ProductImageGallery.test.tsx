import { render, screen, fireEvent } from '@testing-library/react';
import { ProductImageGallery } from '../ProductImageGallery'; 

// Feature: Product Image Gallery Display
describe("Feature: Product Image Gallery Display", () => {
  // Datos de prueba con imágenes
  const mockPictures = [
    "http://example.com/image1.jpg",
    "http://example.com/image2.jpg",
    "http://example.com/image3.jpg",
  ];
  const mockTitle = "Producto de Prueba";

  // Scenario: Component rendered with images
  describe("Scenario: Component rendered with images", () => {
    // Given: A ProductImageGallery component with an array of pictures and a title
    const componentProps = { pictures: mockPictures, title: mockTitle };

    beforeEach(() => {
      // When: The component is rendered
      render(<ProductImageGallery {...componentProps} />);
    });

    it("Then: the main image section should be present", () => {
      expect(screen.getByTestId("product-images-section")).toBeInTheDocument();
      expect(screen.getByTestId("product-images-section")).toHaveClass("product-images-section");
    });

    it("And: the main image should display the first picture initially", () => {
      const mainImageElement = screen.getByTestId("main-image-element");
      expect(mainImageElement).toBeInTheDocument();
      expect(mainImageElement).toHaveAttribute("src", mockPictures[0]);
      expect(mainImageElement).toHaveAttribute("alt", mockTitle);
      expect(mainImageElement).toHaveClass("main-image");
    });

    it("And: the first thumbnail should have the 'active' class initially", () => {
      const firstThumbnail = screen.getByTestId("thumbnail-image-element-0");
      expect(firstThumbnail).toBeInTheDocument();
      expect(firstThumbnail).toHaveClass("thumbnail");
      expect(firstThumbnail).toHaveClass("active"); // La primera miniatura debe estar activa
    });

    it("And: all thumbnails should be rendered with correct src and alt attributes", () => {
      const thumbnails = screen.getAllByTestId(/thumbnail-image-element-/); // Busca todas las miniaturas

      expect(thumbnails).toHaveLength(mockPictures.length);

      mockPictures.forEach((pic, index) => {
        const thumbnail = screen.getByTestId(`thumbnail-image-element-${index}`);
        expect(thumbnail).toBeInTheDocument();
        expect(thumbnail).toHaveAttribute("src", pic);
        expect(thumbnail).toHaveAttribute("alt", mockTitle);
        expect(thumbnail).toHaveClass("thumbnail");
      });
    });

    it("And: hovering over a thumbnail should change the main image", () => {
      const mainImageElement = screen.getByTestId("main-image-element");
      expect(mainImageElement).toHaveAttribute("src", mockPictures[0]); // Inicialmente la primera

      // Simular onMouseEnter en la segunda miniatura
      const secondThumbnail = screen.getByTestId("thumbnail-image-element-1");
      fireEvent.mouseEnter(secondThumbnail);

      // Verificar que la imagen principal cambió a la segunda
      expect(mainImageElement).toHaveAttribute("src", mockPictures[1]);

      // Simular onMouseEnter en la tercera miniatura
      const thirdThumbnail = screen.getByTestId("thumbnail-image-element-2");
      fireEvent.mouseEnter(thirdThumbnail);

      // Verificar que la imagen principal cambió a la tercera
      expect(mainImageElement).toHaveAttribute("src", mockPictures[2]);
    });

    it("And: hovering over a thumbnail should update the active class", () => {

        const firstThumbnail = screen.getByTestId("thumbnail-image-element-0");
        const secondThumbnail = screen.getByTestId("thumbnail-image-element-1");

        expect(firstThumbnail).toHaveClass("active");
        expect(secondThumbnail).not.toHaveClass("active");

        fireEvent.mouseEnter(secondThumbnail);

        expect(firstThumbnail).not.toHaveClass("active");
        expect(secondThumbnail).toHaveClass("active");
    });
  });

  // Scenario: Component rendered without images
  describe("Scenario: Component rendered without images", () => {
    // Given: A ProductImageGallery component with an empty pictures array
    const emptyPicturesProps = { pictures: [], title: mockTitle };
    const nullPicturesProps = { pictures: null as any, title: mockTitle }; // Para probar si pictures es null/undefined

    it("When: the component is rendered with an empty pictures array, Then: it should display a 'No images available' placeholder", () => {
      render(<ProductImageGallery {...emptyPicturesProps} />);
      expect(screen.getByTestId("no-images-placeholder")).toBeInTheDocument();
      expect(screen.getByTestId("no-images-placeholder")).toHaveTextContent("No images available");
    });

    it("When: the component is rendered with a null pictures array, Then: it should display a 'No images available' placeholder", () => {
      render(<ProductImageGallery {...nullPicturesProps} />);
      expect(screen.getByTestId("no-images-placeholder")).toBeInTheDocument();
      expect(screen.getByTestId("no-images-placeholder")).toHaveTextContent("No images available");
    });

    it("And: it should NOT render the thumbnail gallery or main image when no images are available", () => {
      render(<ProductImageGallery {...emptyPicturesProps} />);
      expect(screen.queryByTestId("product-images-section")).not.toBeInTheDocument();
      expect(screen.queryByTestId("product-thumbnail-gallery")).not.toBeInTheDocument();
      expect(screen.queryByTestId("product-main-image")).not.toBeInTheDocument();
      expect(screen.queryByTestId("main-image-element")).not.toBeInTheDocument();
    });
  });
});