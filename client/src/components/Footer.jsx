import React from 'react';

function Footer() {
    return (
        // Using bootstrap footer 
        <footer class="bg-light text-center text-lg-start">
            {/* Adds small sized text in the center and a bg color of light grey */}
            <div class="text-center p-3" style={{backgroundColor:"rgba(0, 0, 0, 0.05"}}> 
            {/* Adds the text "Clark University" centered above the text "Dance and Lighting Portal" in italics */}
                <p style={{marginBottom:"0px"}}>
                    <i>
                    Clark University 
                    </i>
                </p>
                <p style={{marginBottom:"0px"}}>
                    <i>
                    Dance and Lighting Portal
                    </i>
                </p>
            </div>
        </footer>
    );
}

export default Footer;