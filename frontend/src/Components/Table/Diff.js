import * as React from 'react';
import { useEffect, useState } from "react";

export default function Diff(props) {
  const [isLoading, setLoading] = useState(true);
  useEffect(async () => {  
    setLoading(false);
  }, []);

 if (isLoading) return "Loading...";
  else {
  return (
    <React.Fragment>
      <div>{props.diff}</div>
    </React.Fragment>
  );
}
}