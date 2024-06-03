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