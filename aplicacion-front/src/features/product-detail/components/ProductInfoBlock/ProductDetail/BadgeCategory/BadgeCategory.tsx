import { CustomLink } from '../../../../../../components/CustomLink/CustomLink';
import type { badgeInfoProps } from '../../../../types/product';
import './BadgeCategory.scss';

export const BadgeCategory: React.FC<badgeInfoProps> = ({
  badge_info: { text, category_position, category_text, category_url },
}) => {
  return (
    <div className="badge-category-container">
      <span className="badge-category-container__badge">{text}</span>
      <CustomLink
        children={`${category_position} ${category_text}`}
        href={category_url}
        size="xs"
      />
    </div>
  );
};
