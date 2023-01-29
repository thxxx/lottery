import React from "react";
import ExpertPhoto from "../../components/ExpertPhoto";
import { CustomSwipeSlide } from "./BotChat";
import { DOMAINS } from "../../utils/persona";

type ChatSlideProps = {
  item: any;
  children: React.ReactNode;
};

const ChatSlideInner = ({ children, item }: ChatSlideProps) => {
  return (
    <div className="innerd">
      <div className="profile">
        <ExpertPhoto domain={item.job} />
      </div>
      <div className="text">
        <p className="name">
          {DOMAINS.filter((doc) => doc.domain === item.job)[0].name}{" "}
          <span>@{item.job?.toLowerCase()}</span>
        </p>
        {children}
      </div>
    </div>
  );
};

export default React.memo(ChatSlideInner);
