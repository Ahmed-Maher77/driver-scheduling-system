const PageHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => {
    return (
        <header className="page-header">
            <h1 className="text-2xl md:text-3xl font-semibold">{title}</h1>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </header>
    );
};

export default PageHeader;
