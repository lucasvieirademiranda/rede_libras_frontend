import { toast } from 'react-toastify';

var options = {
    position: "top-right",
    autoClose: 6000,
    draggable: false
};

var toaster = {

    configure: (configuration) => {

        if (!configuration)
            toast.configure();
        else
            toast.configure(configuration);
    },

    success: (content) => {
        toast.success(content, options);
    },

    info: (content) => {
        toast.info(content, options);
    },

    warning: (content) => {
        toast.warn(content, options);
    },

    error: (content) => {
        toast.error(content, options);
    }
    
};

export default toaster;