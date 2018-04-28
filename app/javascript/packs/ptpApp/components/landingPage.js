import React from "react";
import { Button } from "semantic-ui-react";

class LandingPage extends React.Component {
  render() {
    return(
      <div>
        <h1>Hello World</h1>
          <Button onClick={() => console.log("Click!") }>
            The Button Here
          </Button>
      </div>
    )
  }
};
export default LandingPage;
