import React from "react";
import { Button } from "react-bootstrap";
import { Fade } from "react-bootstrap";
import { Well } from "react-bootstrap";

class saveBtn extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            open: false
        };
    }

    render() {
        return (
            <div>
                <Button onClick={() => this.setState({ open: !this.state.open })}>
                    click
        </Button>
                <Fade in={this.state.open}>
                    <div>
                        <Well>
                            Anim pariatur cliche reprehenderit, enim eiusmod high life
                            accusamus terry richardson ad squid. Nihil anim keffiyeh
                            helvetica, craft beer labore wes anderson cred nesciunt sapiente
                            ea proident.
            </Well>
                    </div>
                </Fade>
            </div>
        );
    }
}

export default saveBtn;