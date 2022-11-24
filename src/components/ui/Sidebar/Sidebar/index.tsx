import React from "react";

import { Column, Img, Button } from "components";

const Sidebar = (props) => {
  return (
    <>
      <aside className={props.className}>
        <div className="">
          <Column className="bg-indigo_A200 items-center justify-start lg:p-[32px] xl:p-[40px] 2xl:p-[45px] 3xl:p-[54px] w-[100%]">
            <Img
              src="images/img_settings.svg"
              className="mail_One1"
              alt="settings"
            />
            <Button
              className="flex items-center justify-center 2xl:mt-[101px] 3xl:mt-[121px] lg:mt-[71px] xl:mt-[89px] mail_One1"
              shape="icbRoundedBorder12"
              size="mdIcn"
              variant="icbFillWhiteA700"
            >
              <Img
                src="images/img_home.svg"
                className="flex items-center justify-center lg:h-[18px] xl:h-[22px] 2xl:h-[25px] 3xl:h-[29px]"
                alt="home"
              />
            </Button>
            <Button
              className="flex items-center justify-center lg:mt-[28px] xl:mt-[35px] 2xl:mt-[40px] 3xl:mt-[48px] mail_One1"
              shape="icbRoundedBorder12"
              size="mdIcn"
              variant="icbFillWhiteA70033"
            >
              <Img
                src="images/img_calendar.svg"
                className="flex items-center justify-center lg:h-[18px] xl:h-[22px] 2xl:h-[25px] 3xl:h-[29px]"
                alt="calendar"
              />
            </Button>
            <Button
              className="flex items-center justify-center lg:mt-[28px] xl:mt-[35px] 2xl:mt-[40px] 3xl:mt-[48px] mail_One1"
              shape="icbRoundedBorder12"
              size="mdIcn"
              variant="icbFillWhiteA70033"
            >
              <Img
                src="images/img_mail.svg"
                className="flex items-center justify-center lg:h-[18px] xl:h-[22px] 2xl:h-[25px] 3xl:h-[29px]"
                alt="mail"
              />
            </Button>
            <Button
              className="flex items-center justify-center lg:mt-[28px] xl:mt-[35px] 2xl:mt-[40px] 3xl:mt-[48px] mail_One1"
              shape="icbRoundedBorder12"
              size="mdIcn"
              variant="icbFillWhiteA70033"
            >
              <Img
                src="images/img_user.svg"
                className="flex items-center justify-center lg:h-[18px] xl:h-[22px] 2xl:h-[25px] 3xl:h-[29px]"
                alt="user"
              />
            </Button>
            <Button
              className="flex items-center justify-center lg:mt-[28px] xl:mt-[35px] 2xl:mt-[40px] 3xl:mt-[48px] mail_One1"
              shape="icbRoundedBorder12"
              size="mdIcn"
              variant="icbFillWhiteA70033"
            >
              <Img
                src="images/img_settings_48X48.svg"
                className="flex items-center justify-center lg:h-[18px] xl:h-[22px] 2xl:h-[25px] 3xl:h-[29px]"
                alt="settings One"
              />
            </Button>
            <Button
              className="flex items-center justify-center lg:mb-[10px] xl:mb-[13px] 2xl:mb-[15px] 3xl:mb-[18px] lg:mt-[228px] xl:mt-[286px] 2xl:mt-[322px] 3xl:mt-[386px] mail_One1"
              shape="icbRoundedBorder12"
              size="lgIcn"
              variant="icbOutlineWhiteA70033"
            >
              <Img
                src="images/img_arrowright.svg"
                className="flex items-center justify-center lg:h-[13px] xl:h-[17px] 2xl:h-[19px] 3xl:h-[22px]"
                alt="arrowright"
              />
            </Button>
          </Column>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
