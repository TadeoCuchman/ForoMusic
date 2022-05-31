import React from "react";
import "./Pagination.css";

const Pagination = (props) => {
  const Numeritos = () => {
    let componentesNumeritos = [];
    let componentesMuchosNum = [];
    for (let i = 1; i < props.numeritos + 1; i++) {
      componentesNumeritos.push(
        <Numerito cambiarPage={props.cambiarPage} numerito={i} key={i} />
      );
    }
    if (componentesNumeritos.length > 10) {
      componentesMuchosNum = [
        componentesNumeritos[0],
        componentesNumeritos[1],
        componentesNumeritos[2],
        "...",
        componentesNumeritos[props.page],
        "...",
        componentesNumeritos[componentesNumeritos.length - 1],
      ];
      return <div className="numeritos">{componentesMuchosNum}</div>;
    }
    return <div className="numeritos">{componentesNumeritos}</div>;
  };

  const BotonAntYSig = () => {
    return (
      <div className="antSig">
        <button
          onClick={() => {
            if (props.page > 1) {
              props.cambiarPage(props.page - 1);
            }
          }}
        >
          prev
        </button>

        <button
          onClick={() => {
            if (props.page < props.numeritos) {
              props.cambiarPage(props.page + 1);
            }
          }}
        >
          next
        </button>
      </div>
    );
  };

  return (
    <>
      {props.numeritos > 1 ? (
        <>
          <Numeritos />
          <BotonAntYSig />
        </>
      ) : (
        ""
      )}
    </>
  );
};

const Numerito = (props) => {
  return (
    <button onClick={() => props.cambiarPage(props.numerito)}>
      {" "}
      {props.numerito}{" "}
    </button>
  );
};

export default Pagination;
