const dev = process.env.NODE_ENV !== "production";

export const server = dev
    ? "https://vrcwebsolutions.com/ecom-admin/admin/api/index.php"
    : "https://nest-nextjs.vercel.app";

export const imagePath = dev
    ? "https://vrcwebsolutions.com/ecom-admin/admin/common/"
    : "https://nest-nextjs.vercel.app";

export const handleFilterImage = (product) => {
    const image = product.img.filter(img => {
        if (img.image_type == 0) {
            return imagePath + img.path
        }
    });
    return (image.length > 0) ? imagePath + image[0].path : "";
};

export const sort_by = (field, reverse, primer) => {
    const key = primer ?
        function (x) {
            return primer(x[field])
        } :
        function (x) {
            return x[field]
        };

    reverse = !reverse ? 1 : -1;

    return function (a, b) {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    }
}