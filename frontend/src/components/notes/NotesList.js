import Note from "./Note";
import AddNote from "./AddNote";
// import PropTypes from 'prop-types'

// const Divider = () => {
//   return <div className="divider"></div>;
// };
const NotesList = ({
  notes,
  handleAddNote,
  handleDeleteNote,
  handleEditNote,
  handlePinned,
}) => {
  // Function to get pinned note from the todos array
  const getPinnedNotes = () => notes.filter((note) => note.isPinned);
  // Function to get non-pinned note from the todos array
  const getNonPinnedNotes = () => notes.filter((note) => !note.isPinned);
  //check if it has pinned note
  const hasPinnedNotes = getPinnedNotes().length > 0;
  const hasUnPinnedNotes = getNonPinnedNotes().length > 0;
  // console.log("handleDeleteNote:", handleDeleteNote); // Add this console log

  return (
    <div>
      <h1
              style={{
                fontSize: "50px",
                marginBottom: "14px",
                textAlign: "left",
                marginLeft: "7px"
              }}
            >
              Notes
            </h1>
      <div>
        {/* AddNote Card  */}
        <AddNote handleAddNote={handleAddNote} />
      </div>
      {/* <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: "40px", marginTop: "20px" }}> */}
      <div className="row">
        <hr
          style={{
            color: "#000000",
            backgroundColor: "#000000",
            marginTop: "25px",
            marginBottom: "15px",
            borderColor: "#000000",
          }}
        />

        {/* NoteCards */}
        {notes && notes.length > 0 ? (
          <>
            
            {hasPinnedNotes && (
        <h1 style={{ textAlign: "left", fontSize: '15px', marginLeft: "10px" }}>
          Pinned Notes
        </h1>
      )}{getPinnedNotes().map((note) => (
        <div className="col-md-4 my-2" key={note._id}>
          <Note
            key={note._id}
            id={note._id}
            note={note}
            description={note.description}
            date={note.date}
            handleDeleteNote={handleDeleteNote}
            handleEditNote={handleEditNote}
            handlePinned={handlePinned}
          />
        </div>
      ))}

      {hasPinnedNotes && <hr  style={{
    color: '#000000',
    backgroundColor: '#000000',
    height: 1,
    borderColor : '#000000',
    marginTop: "25px",
            marginBottom: "15px",
}}/>}
      

            {/* noteCards Renderring */}
            {hasUnPinnedNotes && hasPinnedNotes && (
              <h1
                style={{
                  textAlign: "left",
                  fontSize: "15px",
                  marginLeft: "10px",
                }}
              >
                Others
              </h1>
            )}
            {getNonPinnedNotes().map((note) => (
              <div className="col-md-4 my-2" key={note._id}>
                <Note
                  key={note._id}
                  id={note._id}
                  note={note}
                  description={note.description}
                  date={note.date}
                  handleDeleteNote={handleDeleteNote}
                  handleEditNote={handleEditNote}
                  handlePinned={handlePinned}
                />
              </div>
            ))}
          </>
        ) : (
          <p>Enter notes to preview.</p>
        )}
      </div>
    </div>
  );
};

export default NotesList;
