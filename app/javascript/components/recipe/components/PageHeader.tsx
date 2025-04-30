import { Link } from "react-router-dom";

function PageHeader() {
    return (
        <header className="home-page-header">
            <Link to="/" className="create-page-title">Roden Family Recipes</Link>
            <svg className="menu" width="30" height="30" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <title/>
                <g data-name="1" id="_1"><path d="M441.13,166.52h-372a15,15,0,1,1,0-30h372a15,15,0,0,1,0,30Z"/>
                    <path d="M441.13,279.72h-372a15,15,0,1,1,0-30h372a15,15,0,0,1,0,30Z"/>
                    <path d="M441.13,392.92h-372a15,15,0,1,1,0-30h372a15,15,0,0,1,0,30Z"/>
                </g>
            </svg>
        </header>
    )
};

export default PageHeader;