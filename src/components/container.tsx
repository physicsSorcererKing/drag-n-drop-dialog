export const Container: React.FC<ChildrenWithin> = ({ children }) => {
  return (
    <div className={'w-full h-[100vh] flex justify-center items-center'}>
      {children}
    </div>
  );
};
