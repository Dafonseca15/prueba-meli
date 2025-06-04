import './CustomText.scss';

interface CustomTextProps {
  children: React.ReactNode;
  as?: 'p' | 'span' | 'div' | 'label' | 'strong' | 'em';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  bold?: boolean | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  color?: string;
  className?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  marginTop?: string;
  marginBottom?: string;
}

export const CustomText: React.FC<CustomTextProps> = ({
  children,
  as: Tag = 'span',
  size = 'md',
  bold = false,
  color,
  className = '',
  align = 'left',
  marginTop,
  marginBottom,
}) => {
  const classes = [
    'custom-text',
    `custom-text--as-${Tag}`,
    `custom-text--size-${size}`,
    `custom-text--align-${align}`,
    className,
  ];

  if (bold === true) {
    classes.push('custom-text--bold-bold');
  } else if (typeof bold === 'string') {
    classes.push(`custom-text--bold-${bold}`);
  }

  const inlineStyles: React.CSSProperties = {};
  if (color) {
    inlineStyles.color = color;
  }
  if (marginTop) {
    inlineStyles.marginTop = marginTop;
  }
  if (marginBottom) {
    inlineStyles.marginBottom = marginBottom;
  }

  return (
    <Tag className={classes.filter(Boolean).join(' ')} style={inlineStyles}>
      {children}
    </Tag>
  );
};
