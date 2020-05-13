import React from 'react'
import { MaterializeComponent } from './Utilities';

export default class ProgressBar extends MaterializeComponent {
    static progressColor="#1a237e";
    static indeterminateColor="#9fa8da";

    render() {
        return <div>
            <div class="progress" style={{backgroundColor:ProgressBar.progressColor}}>
                <div class="indeterminate" style={{backgroundColor:ProgressBar.indeterminateColor}}></div>
            </div>
        </div>
    }
}