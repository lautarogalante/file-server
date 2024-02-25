import { DirectoryListTypes } from "../interfaces/FileAndDirectory";

export const DirectoryList = (({
    directories, icon,
    accessDir, selectedDirs,
    toggleSelectionDir }: DirectoryListTypes,

) => {
    return (
        <div id="dir-file" className="dir-file-cont">
            <div id="dir-file">
                {Array.isArray(directories) && directories.map((directory, index) => (
                    <div id="dir-file" className={`dir ${selectedDirs.some(selectedDir => selectedDir.name === directory.name) ? 'selected' : 'dir'}`}
                        key={index}
                        onDoubleClick={() => accessDir(directory)}
                        onClick={(e) => toggleSelectionDir(directory, e.ctrlKey)}
                    >
                        <span id="dir-file" className="dir-icon"><i className={icon}></i></span>
                        <span id="dir-file" className="dir-sp">{directory.name}</span>
                        <span id="dir-file" className="dir-sp">{directory.size}</span>
                    </div>
                ))}
            </div>
        </div>

    );
});