const PageHeader = ({ title }: { title: string }) => {
    return (
        <header className="page-header">
            <h1 className="text-2xl md:text-3xl max-sm:text-center font-semibold">{title}</h1>
        </header>
    );
};

export default PageHeader;
