

//desestructuramos el event de las props recibidas en el CalendarPage dentro de calendar atributo components
export const CalendarEvent = ({ event }) => {

    //desestructuramos del evento recibido
    const { title, user } = event;


    return (
        <>
            <strong> { title} </strong>
            <span> - { user.name} </span>
        </>
    )
}
