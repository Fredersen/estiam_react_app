import './Widget.css';
import { Card, CardContent, Typography } from "@mui/material";

export default function Widget({title, value,  percentageIncrease, icon}) {
    return (
        <Card className="admin-right-content-widget">
            <CardContent>
                <div className={"admin-right-content-widget-content-container"}>
                    <Typography variant="h6" component="div" className="admin-right-content-widget-title">
                        {title}
                    </Typography>
                    <Typography variant="h4" component="div" className="admin-right-content-widget-value">
                        {value}
                    </Typography>
                    <div className="admin-right-content-bottom-container">
                        <div className="admin-right-content-widget-icon">
                            {icon}
                        </div>
                        <Typography variant="subtitle1" component="div" className="admin-right-content-widget-percentage">
                            {percentageIncrease >= 0 ? `+${percentageIncrease}%` : `${percentageIncrease}%`}
                        </Typography>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}