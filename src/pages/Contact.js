import React from "react";
import FormHeader from "../components/FormHeader.js";
import ContactForm from "../specificComponents/ContactForm.js";

class PageContact extends React.Component {
  render() {
    return (
      <div>
        <FormHeader text="Contact us!" />
        <ContactForm/>
      </div>
    );
  }
}

export default PageContact;
