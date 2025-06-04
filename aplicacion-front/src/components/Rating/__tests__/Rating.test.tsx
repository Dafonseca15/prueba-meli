import { render, screen } from '@testing-library/react';
import { Rating } from '../Rating';
import type { RatingProps } from '../../../features/product-detail/types/product';

describe('Rating Component (BDD Style)', () => {
  describe('Given a Rating component with various rating data', () => {
    test('When rendered with average 4.5 and 100 reviews, then it should display 4 full, 1 half, and 0 empty stars', () => {
      const mockRating: RatingProps['rating'] = { average: 4.5, total_reviews: 100 };
      render(<Rating rating={mockRating} />);

      expect(screen.getByText('4.5')).toBeInTheDocument();
      expect(screen.getByText('(100)')).toBeInTheDocument();

      expect(screen.queryAllByTestId('star-full')).toHaveLength(4);
      expect(screen.queryAllByTestId('star-half')).toHaveLength(1);
      expect(screen.queryAllByTestId('star-empty')).toHaveLength(0);
    });

    test('When rendered with average 3.0 and 50 reviews, then it should display 3 full, 0 half, and 2 empty stars', () => {
      const mockRating: RatingProps['rating'] = { average: 3.0, total_reviews: 50 };
      render(<Rating rating={mockRating} />);

      expect(screen.getByText('3.0')).toBeInTheDocument();
      expect(screen.getByText('(50)')).toBeInTheDocument();

      expect(screen.queryAllByTestId('star-full')).toHaveLength(3);
      expect(screen.queryAllByTestId('star-half')).toHaveLength(0);
      expect(screen.queryAllByTestId('star-empty')).toHaveLength(2);
    });

    test('When rendered with average 0.0 and 0 reviews, then it should display 0 full, 0 half, and 5 empty stars', () => {
      const mockRating: RatingProps['rating'] = { average: 0.0, total_reviews: 0 };
      render(<Rating rating={mockRating} />);

      expect(screen.getByText('0.0')).toBeInTheDocument();
      expect(screen.getByText('(0)')).toBeInTheDocument();

      expect(screen.queryAllByTestId('star-full')).toHaveLength(0);
      expect(screen.queryAllByTestId('star-half')).toHaveLength(0);
      expect(screen.queryAllByTestId('star-empty')).toHaveLength(5);
    });

    test('When rendered with average 5.0 and 200 reviews, then it should display 5 full, 0 half, and 0 empty stars', () => {
      const mockRating: RatingProps['rating'] = { average: 5.0, total_reviews: 200 };
      render(<Rating rating={mockRating} />);

      expect(screen.getByText('5.0')).toBeInTheDocument();
      expect(screen.getByText('(200)')).toBeInTheDocument();

      expect(screen.queryAllByTestId('star-full')).toHaveLength(5);
      expect(screen.queryAllByTestId('star-half')).toHaveLength(0);
      expect(screen.queryAllByTestId('star-empty')).toHaveLength(0);
    });

    test('When average is 3.2, it should display 3 full, 0 half, and 2 empty stars (rounds down for half)', () => {
      const mockRating: RatingProps['rating'] = { average: 3.2, total_reviews: 10 };
      render(<Rating rating={mockRating} />);

      expect(screen.getByText('3.2')).toBeInTheDocument();
      expect(screen.queryAllByTestId('star-full')).toHaveLength(3);
      expect(screen.queryAllByTestId('star-half')).toHaveLength(0);
      expect(screen.queryAllByTestId('star-empty')).toHaveLength(2);
    });

    test('When average is 2.5, it should display 2 full, 1 half, and 2 empty stars', () => {
      const mockRating: RatingProps['rating'] = { average: 2.5, total_reviews: 10 };
      render(<Rating rating={mockRating} />);

      expect(screen.getByText('2.5')).toBeInTheDocument();
      expect(screen.queryAllByTestId('star-full')).toHaveLength(2);
      expect(screen.queryAllByTestId('star-half')).toHaveLength(1);
      expect(screen.queryAllByTestId('star-empty')).toHaveLength(2);
    });
  });
});
