function CreateFormHeader ({title}: {title: string}) {
    
    return (
        <div className="row form-header-row align-items-center">
            <span className="secondary-title col-10">{title}</span>
        </div>   
)};

export default CreateFormHeader;