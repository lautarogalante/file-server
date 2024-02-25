import { FileListTypes } from "../interfaces/FileAndDirectory";

export const FileList = (({
    icon, files,
    selectedFiles,
    toggleSelectionFiles }: FileListTypes,

) => {
    return (
        <div id="dir-file" className="dir-file-cont">
            <div id="dir-file">
                {Array.isArray(files) && files.map((file, index) => (
                    <div id="dir-file" className={`file ${selectedFiles.some(selectedFile => selectedFile.name === file.name) ? 'selected' : 'file'}`}
                        key={index}
                        onClick={(e) => toggleSelectionFiles(file, e.ctrlKey)}
                    >
                        <span id="dir-file" className="fl-icon"><i className={icon}></i></span>
                        <span id="dir-file" className="fl-sp">{file.name}</span>
                        <span id="dir-file" className="fl-sp">{file.size}</span>
                    </div>
                ))}
            </div>
        </div>
    );
});