const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="md:w-4/12 mx-auto text-center my-8 mb-4">
            <p className="text-blue-500">{subHeading}</p>
            <h3 className="text-3xl uppercase border-blue-300 border-y-4 py-4">{heading}</h3>
        </div>
    );
};

export default SectionTitle;