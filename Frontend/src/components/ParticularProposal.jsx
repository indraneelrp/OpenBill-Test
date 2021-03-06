import React from "react";
import "./ParticularProposal.css";
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
import PageTitle from "./PageTitle";
import QuillEditor from "./QuillEditor";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCrud } from "../hooks/useCRUD";
import { useDoc } from "../hooks/useDoc";
import { Link } from "react-router-dom";

function Proposal(props) {
  const { id, type } = useParams();
  const { user } = useAuthContext();
  const { deleteDoc } = useCrud(`${type}s`);
  const { currDoc } = useDoc(`${type}s`, id);
  const nav = useNavigate();

  // only render anything when currDoc not null
  if(currDoc !== null){
    
    let image;
    let colour;
    const isOwner = Boolean(currDoc.OwnerID === user.uid)
    
    const deleteHandler = (event) => {
      deleteDoc(currDoc.id);
      nav("/ProposalsHome");
    };

    switch (currDoc.Category) {
      default:
        image = OB;
        break;
      case "Environment":
        image = treeImage;
        colour = "env_pop-100";
        break;
      case "Education":
        image = educationImage;
        colour = "edu_pop-100";
        break;
      case "Economic":
        image = moneyImage;
        colour = "econ_pop-100";
        break;
      case "Social Welfare":
        image = mailImage;
        colour = "social_pop-100";
        break;
      case "Gender":
        image = ringImage;
        colour = "gender_pop-100";
        break;
      case "Privacy/Security":
        image = thumbprintImage;
        colour = "priv_pop-100";
        break;
      case "Health":
        image = plusImage;
        colour = "health_pop-100";
        break;
      case "Housing":
        image = cityImage;
        colour = "housing_pop-100";
        break;
      case "Transport":
        image = busImage;
        colour = "housing_pop-100";
        break;
    }

    if(currDoc.ProposalType === "OpenQuestion")
    {
      return (
        <div className="font-main bg-slate-100">
          <PageTitle title={currDoc.ProposalType} />
    
          <div className="mainProposalContainer py-10">
            <div className="proposalContainer">
              <section className="proposalHeader bg-black text-white">
                <h2 className="proposalTitle">{currDoc.Title}</h2>
                <h4 className="proposalOwner">By {currDoc.DisplayName}</h4>
                <img src={image} alt="Category" className="categoryImage" />
                <h5 className="proposalCategory ">{currDoc.Category}</h5>
              </section>

              {user && (isOwner && (
                <div className="flex place-self-end mt-2 font-semibold">
                  <button className={`py-1 px-6 mx-1 rounded-full bg-${colour}`} onClick={deleteHandler}>Delete</button>
                  <Link 
                    to={`/ProposalsHome/OpenQuestion/${id}/editQ`}
                    key={currDoc.id}
                  >
                    <button className={`py-1 px-8 mx-1 rounded-full bg-${colour}`}>Edit</button>
                  </Link>
                </div>
              ))}
    
              <section className="proposalContent">
                <h3>Question</h3>
                <QuillEditor
                  readMode={true}
                  payload={JSON.parse(currDoc.Content)}
                /> 
              </section>

              <section className="proposalContent">
                <h3>Background</h3>
                <QuillEditor
                  readMode={true}
                  payload={JSON.parse(currDoc.Background)}
                /> 
              </section>
            </div>
          </div>
        </div>
      );
    }
    else{
      return (
        <div className="font-main bg-slate-100">
          <PageTitle title={currDoc.ProposalType} />
    
          <div className="mainProposalContainer py-10">
            <div className="proposalContainer">
              <section className="proposalHeader bg-black text-white">
                <h2 className="proposalTitle">{currDoc.Title}</h2>
                <h4 className="proposalOwner">By {currDoc.DisplayName}</h4>
                <img src={image} alt="Category" className="categoryImage" />
                <h5 className="proposalCategory ">{currDoc.Category}</h5>
              </section>

              {user && (isOwner && (
                <div className="flex place-self-end mt-2 font-semibold">
                  <button className={`py-1 px-6 mx-1 rounded-full bg-${colour}`} onClick={deleteHandler}>Delete</button>
                  <Link 
                    to={`/ProposalsHome/OpenBill/${id}/editB`}
                    key={currDoc.id}
                  >
                    <button className={`py-1 px-8 mx-1 rounded-full bg-${colour}`}>Edit</button>
                  </Link>
                </div>
              ))}
    
              <section className="proposalContent">
                <h3>Related Laws</h3>
                <QuillEditor
                  readMode={true}
                  payload={JSON.parse(currDoc.RelatedLaws)}
                /> 
              </section>

              <section className="proposalContent">
                <h3>Current Problems</h3>
                <QuillEditor
                  readMode={true}
                  payload={JSON.parse(currDoc.CurrentProblems)}
                /> 
              </section>

              <section className="proposalContent">
                <h3>Summary of Recommendations</h3>
                <QuillEditor
                  readMode={true}
                  payload={JSON.parse(currDoc.Summary)}
                /> 
              </section>

              <section className="proposalContent">
                <h3>Elaboration: Implementation</h3>
                <QuillEditor
                  readMode={true}
                  payload={JSON.parse(currDoc.Elaboration1)}
                /> 
              </section>

              {!(currDoc.Elaboration2 === "") && (
                <section className="proposalContent">
                  <h3>Elaboration: Part 2</h3>
                  <QuillEditor
                    readMode={true}
                    payload={JSON.parse(currDoc.Elaboration2)}
                  /> 
                </section>
              )}

              {!(currDoc.Bibliography === "") && (
                <section className="proposalContent">
                  <h3>Bibliography</h3>
                  <QuillEditor
                    readMode={true}
                    payload={JSON.parse(currDoc.Bibliography)}
                  /> 
                </section>
              )}
            </div>
          </div>
        </div>
      );
    }
    
  }
  else{
    return(
      <div className="py-20 w-full text-center bg-slate-100 font-title">
        <h3>Retreieving data...</h3>
      </div>
    )
  }

}

export default Proposal;
