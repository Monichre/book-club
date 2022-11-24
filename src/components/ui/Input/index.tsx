import { ErrorMessage } from "../../components/ErrorMessage";
import React from "react";
import PropTypes from "prop-types";

const variants = {
  FillWhiteA700: "bg-white_A700",
  OutlineGray5006c: "border border-gray_500_6c border-solid",
  FillGray900: "bg-gray_900",
  FillGray100: "bg-gray_100",
  srcFillWhiteA700: "bg-white_A700",
  srcFillGray800: "bg-gray_800",
};
const shapes = {
  RoundedBorder8: "rounded-radius8",
  RoundedBorder19: "rounded-radius19",
  RoundedBorder12: "rounded-radius12",
  srcRoundedBorder12: "rounded-radius12",
};
const sizes = {
  sm: "lg:p-[3px] xl:p-[4px] p-[5px] 3xl:p-[6px]",
  md: "p-[11px] 3xl:p-[13px] lg:p-[7px] xl:p-[9px]",
  lg: "lg:pb-[24px] xl:pb-[31px] pb-[35px] 3xl:pb-[42px] xl:pt-[11px] pt-[13px] 3xl:pt-[15px] lg:pt-[9px] xl:px-[11px] px-[13px] 3xl:px-[15px] lg:px-[9px]",
  xl: "lg:p-[11px] xl:p-[14px] p-[16px] 3xl:p-[19px]",
  "2xl":
    "xl:pb-[12px] pb-[14px] 3xl:pb-[16px] lg:pb-[9px] lg:pt-[12px] xl:pt-[16px] pt-[18px] 3xl:pt-[21px] xl:px-[12px] px-[14px] 3xl:px-[16px] lg:px-[9px]",
  "3xl":
    "lg:pb-[24px] xl:pb-[31px] pb-[35px] 3xl:pb-[42px] lg:pt-[12px] xl:pt-[16px] pt-[18px] 3xl:pt-[21px] lg:px-[12px] xl:px-[16px] px-[18px] 3xl:px-[21px]",
  "4xl":
    "lg:pb-[13px] xl:pb-[16px] pb-[19px] 3xl:pb-[22px] lg:pt-[16px] xl:pt-[20px] pt-[23px] 3xl:pt-[27px] lg:px-[13px] xl:px-[16px] px-[19px] 3xl:px-[22px]",
  smSrc: "lg:p-[5px] xl:p-[7px] p-[8px] 3xl:p-[9px]",
  mdSrc:
    "xl:pb-[11px] pb-[13px] 3xl:pb-[15px] lg:pb-[9px] lg:pt-[5px] xl:pt-[7px] pt-[8px] 3xl:pt-[9px] lg:px-[5px] xl:px-[7px] px-[8px] 3xl:px-[9px]",
  lgSrc: "lg:p-[14px] xl:p-[18px] p-[21px] 3xl:p-[25px]",
};

const Input = React.forwardRef(
  (
    {
      wrapClassName = "",
      className = "",
      name,
      placeholder,
      type = "text",
      children,
      errors = [],
      label = "",
      prefix,
      suffix,
      shape,
      variant,
      size,
      ...restProps
    },
    ref
  ) => {
    return (
      <>
        <div
          className={`${wrapClassName} ${shapes[shape] || ""} ${
            variants[variant] || ""
          } ${sizes[size] || ""}`}
        >
          {!!label && label}
          {!!prefix && prefix}
          <input
            ref={ref}
            className={`${className} bg-transparent border-0`}
            type={type}
            name={name}
            placeholder={placeholder}
            {...restProps}
          />
          {!!suffix && suffix}
        </div>
        {!!errors && <ErrorMessage errors={errors} />}
      </>
    );
  }
);

Input.propTypes = {
  wrapClassName: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  shape: PropTypes.oneOf([
    "RoundedBorder8",
    "RoundedBorder19",
    "RoundedBorder12",
    "srcRoundedBorder12",
  ]),
  variant: PropTypes.oneOf([
    "FillWhiteA700",
    "OutlineGray5006c",
    "FillGray900",
    "FillGray100",
    "srcFillWhiteA700",
    "srcFillGray800",
  ]),
  size: PropTypes.oneOf([
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "smSrc",
    "mdSrc",
    "lgSrc",
  ]),
};
Input.defaultProps = {
  wrapClassName: "",
  className: "",
  name: "",
  placeholder: "",
  type: "text",
  shape: "",
  variant: "FillWhiteA700",
  size: "2xl",
};

export { Input };
