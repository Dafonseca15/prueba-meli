import { render, screen, fireEvent } from '@testing-library/react';
import { ProductImageGallery } from '../ProductImageGallery';

describe('Feature: Product Image Gallery Display', () => {
  const mockPictures = [
    'http://example.com/image1.jpg',
    'http://example.com/image2.jpg',
    'http://example.com/image3.jpg',
  ];
  const mockTitle = 'Producto de Prueba';

  describe('Scenario: Component rendered with images', () => {
    const componentProps = { pictures: mockPictures, title: mockTitle };

    beforeEach(() => {
      render(<ProductImageGallery {...componentProps} />);
    });

    it('Then: the main image section should be present', () => {
      expect(screen.getByTestId('product-images-section')).toBeInTheDocument();
      expect(screen.getByTestId('product-images-section')).toHaveClass('product-images-section');
    });

    it('And: the main image should display the first picture initially', () => {
      const mainImageElement = screen.getByTestId('main-image-element');
      expect(mainImageElement).toBeInTheDocument();
      expect(mainImageElement).toHaveAttribute('src', mockPictures[0]);
      expect(mainImageElement).toHaveAttribute('alt', mockTitle);
      expect(mainImageElement).toHaveClass('main-image');
    });

    it("And: the first thumbnail should have the 'active' class initially", () => {
      const firstThumbnail = screen.getByTestId('thumbnail-image-element-0');
      expect(firstThumbnail).toBeInTheDocument();
      expect(firstThumbnail).toHaveClass('thumbnail');
      expect(firstThumbnail).toHaveClass('active');
    });

    it('And: all thumbnails should be rendered with correct src and alt attributes', () => {
      const thumbnails = screen.getAllByTestId(/thumbnail-image-element-/);

      expect(thumbnails).toHaveLength(mockPictures.length);

      mockPictures.forEach((pic, index) => {
        const thumbnail = screen.getByTestId(`thumbnail-image-element-${index}`);
        expect(thumbnail).toBeInTheDocument();
        expect(thumbnail).toHaveAttribute('src', pic);
        expect(thumbnail).toHaveAttribute('alt', mockTitle);
        expect(thumbnail).toHaveClass('thumbnail');
      });
    });

    it('And: hovering over a thumbnail should change the main image', () => {
      const mainImageElement = screen.getByTestId('main-image-element');
      expect(mainImageElement).toHaveAttribute('src', mockPictures[0]);

      const secondThumbnail = screen.getByTestId('thumbnail-image-element-1');
      fireEvent.mouseEnter(secondThumbnail);

      expect(mainImageElement).toHaveAttribute('src', mockPictures[1]);

      const thirdThumbnail = screen.getByTestId('thumbnail-image-element-2');
      fireEvent.mouseEnter(thirdThumbnail);

      expect(mainImageElement).toHaveAttribute('src', mockPictures[2]);
    });

    it('And: hovering over a thumbnail should update the active class', () => {
      const firstThumbnail = screen.getByTestId('thumbnail-image-element-0');
      const secondThumbnail = screen.getByTestId('thumbnail-image-element-1');

      expect(firstThumbnail).toHaveClass('active');
      expect(secondThumbnail).not.toHaveClass('active');

      fireEvent.mouseEnter(secondThumbnail);

      expect(firstThumbnail).not.toHaveClass('active');
      expect(secondThumbnail).toHaveClass('active');
    });
  });

  describe('Scenario: Component rendered without images', () => {
    const emptyPicturesProps = { pictures: [], title: mockTitle };
    const nullPicturesProps = { pictures: null as any, title: mockTitle };

    it("When: the component is rendered with an empty pictures array, Then: it should display a 'No images available' placeholder", () => {
      render(<ProductImageGallery {...emptyPicturesProps} />);
      expect(screen.getByTestId('no-images-placeholder')).toBeInTheDocument();
      expect(screen.getByTestId('no-images-placeholder')).toHaveTextContent('No images available');
    });

    it("When: the component is rendered with a null pictures array, Then: it should display a 'No images available' placeholder", () => {
      render(<ProductImageGallery {...nullPicturesProps} />);
      expect(screen.getByTestId('no-images-placeholder')).toBeInTheDocument();
      expect(screen.getByTestId('no-images-placeholder')).toHaveTextContent('No images available');
    });

    it('And: it should NOT render the thumbnail gallery or main image when no images are available', () => {
      render(<ProductImageGallery {...emptyPicturesProps} />);
      expect(screen.queryByTestId('product-images-section')).not.toBeInTheDocument();
      expect(screen.queryByTestId('product-thumbnail-gallery')).not.toBeInTheDocument();
      expect(screen.queryByTestId('product-main-image')).not.toBeInTheDocument();
      expect(screen.queryByTestId('main-image-element')).not.toBeInTheDocument();
    });
  });
});
