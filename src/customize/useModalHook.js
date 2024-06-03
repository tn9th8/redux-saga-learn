import { useState } from 'react';

export default function useCustomHook(initialValue = false) {
    const [open, setOpen] = useState(initialValue);

    const handle = {
        open: () => {
            setOpen(true);
        },
        close: () => {
            setOpen(false);
        },
    };

    return [open, handle];
}

// // Sử dụng hook trong component
// function MyComponent() {
//     const [open, handle] = useCustomHook(true); // Giá trị khởi đầu là true

//     return (
//         <div>
//             {/* Modal component */}
//             <Modal open={open} />

//             {/* Button to open the modal */}
//             <button onClick={handle.open}>Open Modal</button>

//             {/* Button to close the modal */}
//             <button onClick={handle.close}>Close Modal</button>
//         </div>
//     );
// }


// export default 
