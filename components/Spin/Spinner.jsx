import classes from "@/components/Spin/Spinner.module.css"

export function Spinner() {
        return <>
                <div className={classes.loaderContainer}>
                        <div className={classes.loader}></div>
                </div>
        </>
};