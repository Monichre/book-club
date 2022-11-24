import React from "react";
import PropTypes from "prop-types";

const shapes = {
  RoundedBorder12: "rounded-radius12",
  CircleBorder29: "rounded-radius29",
  RoundedBorder4: "rounded-radius4",
  RoundedBorder15: "rounded-radius1516",
  RoundedBorder8: "rounded-radius884",
  icbRoundedBorder8: "rounded-radius8",
  icbRoundedBorder12: "rounded-radius12",
  icbRoundedBorder24: "rounded-radius24",
};
const variants = {
  FillLightblue200: "bg-light_blue_200 text-white_A700",
  FillIndigoA200: "bg-indigo_A200 text-white_A700",
  FillGray900: "bg-gray_900 text-white_A700",
  OutlineGray50066: "border-2 border-gray_500_66 border-solid",
  FillWhiteA700: "bg-white_A700 text-gray_900",
  FillGray1006c: "bg-gray_100_6c text-gray_900",
  FillGreen400: "bg-green_400 text-white_A700",
  FillWhiteA70033: "bg-white_A700_33 text-white_A700",
  FillGray100: "bg-gray_100 text-gray_500",
  FillGray50048: "bg-gray_500_48 text-gray_500",
  OutlineGray50033: "border-2 border-gray_500_33 border-solid text-gray_900",
  OutlineGray5006c: "border-2 border-gray_500_6c border-solid text-gray_900",
  FillGray10090: "bg-gray_100_90 text-gray_500",
  OutlineGray50099: "border-2 border-gray_500_99 border-solid text-white_A700",
  FillRedA200: "bg-red_A200 text-white_A700",
  FillGray50033: "bg-gray_500_33 text-gray_500",
  icbFillIndigoA200: "bg-indigo_A200",
  icbFillLightblue20033: "bg-light_blue_200_33",
  icbFillGray100: "bg-gray_100",
  icbFillWhiteA70033: "bg-white_A700_33",
  icbFillWhiteA70099: "bg-white_A700_99",
  icbOutlineWhiteA70033: "border-2 border-solid border-white_A700_33",
  icbOutlineWhiteA70033_1: "outline outline-[1px] outline-white_A700_33",
  icbFillWhiteA70066: "bg-white_A700_66",
  icbFillGreen400: "bg-green_400",
  icbFillGray900: "bg-gray_900",
  icbFillWhiteA700: "bg-white_A700",
  icbFillRedA200: "bg-red_A200",
  icbOutlineGray50033: "border-2 border-gray_500_33 border-solid",
  icbOutlineGray50066: "border-2 border-gray_500_66 border-solid",
};
const sizes = {
  sm: "lg:p-[3px] xl:p-[4px] p-[5px] 3xl:p-[6px]",
  md: "lg:p-[5px] xl:p-[7px] p-[8px] 3xl:p-[9px]",
  lg: "xl:p-[10px] p-[12px] 3xl:p-[14px] lg:p-[8px]",
  xl: "lg:p-[15px] xl:p-[19px] p-[22px] 3xl:p-[26px]",
  smIcn: "lg:p-[4px] xl:p-[6px] p-[7px] 3xl:p-[8px]",
  mdIcn: "p-[11px] 3xl:p-[13px] lg:p-[7px] xl:p-[9px]",
  lgIcn: "lg:p-[10px] xl:p-[13px] p-[15px] 3xl:p-[18px]",
  xlIcn: "lg:p-[14px] xl:p-[17px] p-[20px] 3xl:p-[24px]",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape,
  variant,
  size,
  ...restProps
}) => {
  return (
    <button
      className={`${className} ${shapes[shape] || ""} ${
        variants[variant] || ""
      } ${sizes[size] || ""} common-button `}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  shape: PropTypes.oneOf([
    "RoundedBorder12",
    "CircleBorder29",
    "RoundedBorder4",
    "RoundedBorder15",
    "RoundedBorder8",
    "icbRoundedBorder8",
    "icbRoundedBorder12",
    "icbRoundedBorder24",
  ]),
  variant: PropTypes.oneOf([
    "FillLightblue200",
    "FillIndigoA200",
    "FillGray900",
    "OutlineGray50066",
    "FillWhiteA700",
    "FillGray1006c",
    "FillGreen400",
    "FillWhiteA70033",
    "FillGray100",
    "FillGray50048",
    "OutlineGray50033",
    "OutlineGray5006c",
    "FillGray10090",
    "OutlineGray50099",
    "FillRedA200",
    "FillGray50033",
    "icbFillIndigoA200",
    "icbFillLightblue20033",
    "icbFillGray100",
    "icbFillWhiteA70033",
    "icbFillWhiteA70099",
    "icbOutlineWhiteA70033",
    "icbOutlineWhiteA70033_1",
    "icbFillWhiteA70066",
    "icbFillGreen400",
    "icbFillGray900",
    "icbFillWhiteA700",
    "icbFillRedA200",
    "icbOutlineGray50033",
    "icbOutlineGray50066",
  ]),
  size: PropTypes.oneOf([
    "sm",
    "md",
    "lg",
    "xl",
    "smIcn",
    "mdIcn",
    "lgIcn",
    "xlIcn",
  ]),
};
Button.defaultProps = { className: "", shape: "", variant: "", size: "" };

export { Button };
