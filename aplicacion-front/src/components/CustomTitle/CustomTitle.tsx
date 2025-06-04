interface CustomTitleProps {
  children: React.ReactNode;
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  bold?: boolean | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  color?: string;
  className?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  marginBottom?: string;
  marginTop?: string;
}

export const CustomTitle: React.FC<CustomTitleProps> = ({
  children,
  level = 'h1',
  bold = false,
  size = 'md',
  color,
  className = '',
  align = 'left',
  marginBottom,
  marginTop,
}) => {
  const classes = [
    'custom-title',
    `custom-title--level-${level}`,
    `custom-title--size-${size}`,
    `custom-title--align-${align}`,
    className,
  ];

  if (bold === true) {
    classes.push('custom-title--bold-bold');
  } else if (typeof bold === 'string') {
    classes.push(`custom-title--bold-${bold}`);
  }

  const inlineStyles: React.CSSProperties = {};
  if (color) {
    inlineStyles.color = color;
  }
  if (marginBottom) {
    inlineStyles.marginBottom = marginBottom;
  }
  if (marginTop) {
    inlineStyles.marginTop = marginTop;
  }

  const Tag = level;
  return (
    <Tag className={classes.filter(Boolean).join(' ')} style={inlineStyles}>
      {children}
    </Tag>
  );
};
