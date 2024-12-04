export const TitleFlex: FC<ChildrenWithin> = ({ children }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
      {children}
    </div>
  );
};
