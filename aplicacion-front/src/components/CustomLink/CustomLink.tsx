import './CustomLink.scss';

interface CustomLinkProps {
  children: React.ReactNode;
  href: string;
  target?: '_self' | '_blank' | '_parent' | '_top';
  rel?: string;
  type?: 'primary' | 'secondary' | 'text' | 'button';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  bold?: boolean | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  color?: string;
  underline?: boolean | 'hover';
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const CustomLink: React.FC<CustomLinkProps> = ({
  children,
  href,
  target = '_self',
  rel,
  type = 'text',
  size = 'md',
  bold = false,
  color,
  underline = 'hover',
  className = '',
  onClick,
}) => {
  const classes = [
    'custom-link',
    `custom-link--type-${type}`,
    `custom-link--size-${size}`,
    className,
  ];

  if (bold === true) {
    classes.push('custom-link--bold-bold');
  } else if (typeof bold === 'string') {
    classes.push(`custom-link--bold-${bold}`);
  }

  if (underline === true) {
    classes.push('custom-link--underline-always');
  } else if (underline === 'hover') {
    classes.push('custom-link--underline-hover');
  } else if (underline === false) {
    classes.push('custom-link--underline-none');
  }

  const inlineStyles: React.CSSProperties = {};
  if (color) {
    inlineStyles.color = color;
  }

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={classes.filter(Boolean).join(' ')}
      style={inlineStyles}
      onClick={onClick}
    >
      {children}
    </a>
  );
};
