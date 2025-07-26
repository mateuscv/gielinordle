import React from "react";
import { Button } from "react-bootstrap";

interface ResultProps {
  result: React.ReactNode;
}

const Result: React.FC<ResultProps> = ({ result }) => (
  <div className="result">{result}</div>
);

export default Result;
