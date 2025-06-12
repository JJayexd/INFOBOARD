export const Header = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('da-DK', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }).toUpperCase();

    const formattedTime = currentDate.toLocaleTimeString('da-DK', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <header className="text-black text-center py-4 rounded-lg mt-1">
            <h1 className="text-3xl md:text-5xl font-light">
                <span className="font-extrabold">TECH</span>COLLEGE
            </h1>
            <p className="text-xs md:text-sm mt-1 tracking-wider font-semibold">
                {formattedDate} - {formattedTime}
            </p>
        </header>
    );
};
