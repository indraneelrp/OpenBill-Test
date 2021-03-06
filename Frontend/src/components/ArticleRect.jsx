import React from "react";
import "./ArticleRect.css";
import treeImage from "../imgs/OB(tree).png";
import educationImage from "../imgs/OB(education).png";
import moneyImage from "../imgs/OB(money).png";
import mailImage from "../imgs/OB(mail).png";
import ringImage from "../imgs/OB(ring).png";
import thumbprintImage from "../imgs/OB(thumbprint).png";
import plusImage from "../imgs/OB(plus).png";
import cityImage from "../imgs/OB(city).png";
import busImage from "../imgs/OB(bus).png";
import OB from "../imgs/OB(logo).png";
import QuillEditor from "./QuillEditor";

function ArticleRect(props) {
  let image;
  switch (props.category) {
    default:
      image = OB;
      break;
    case "Environment":
      image = treeImage;
      break;
    case "Education":
      image = educationImage;
      break;
    case "Economic":
      image = moneyImage;
      break;
    case "Social Welfare":
      image = mailImage;
      break;
    case "Gender":
      image = ringImage;
      break;
    case "Privacy/Security":
      image = thumbprintImage;
      break;
    case "Health":
      image = plusImage;
      break;
    case "Housing":
      image = cityImage;
      break;
    case "Transport":
      image = busImage;
      break;
  }

  console.log(props.content);

  return (
    <div>
      <div className="articlePreviewContainer">
        <h2 className="articlePreviewTitle">{props.title}</h2>
        {/* <h3 className="articlePreviewCategory">{props.category}</h3> */}
        {/* <p className="articlePreviewBody">{props.content}</p> */}
        {/* <QuillEditor
          className="articlePreviewBody"
          readMode={true}
          payload={JSON.parse(props.content)}
        /> */}
        <img className="articleIcon" src={image} alt="Article Icon" />
      </div>
    </div>
  );
}

export default ArticleRect;
