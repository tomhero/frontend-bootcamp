import React from "react";

type LayoutProps = any;

const Layout: React.FC = (props: LayoutProps) => {
    return (
    // Just like a React.Fragment below
    <>
        <div>Toolbar, Sidedrawer, Backdrop</div>
        <main>
            {props.children}
        </main>
    </>
    );
}

export default Layout;