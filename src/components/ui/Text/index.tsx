import React from "react";
const variantClasses = {
  h1: "font-bold lg:text-[21px] xl:text-[26px] text-[30px] 3xl:text-[36px]",
  h2: "font-bold lg:text-[15px] xl:text-[19px] text-[22.32px] 2xl:text-[22px] 3xl:text-[26px]",
  h3: "font-bold lg:text-[15px] xl:text-[19px] text-[22px] 3xl:text-[26px]",
  h4: "font-bold lg:text-[11px] xl:text-[14px] text-[16px] 3xl:text-[19px]",
  h5: "xl:text-[12px] text-[14px] 3xl:text-[16px] lg:text-[9px]",
  h6: "xl:text-[10px] text-[12px] 3xl:text-[14px] lg:text-[8px]",
};
const Text = ({ children, className, variant, as, ...restProps }) => {
  const Component = as || "span";
  return (
    <Component
      className={`${className} ${variantClasses[variant]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
