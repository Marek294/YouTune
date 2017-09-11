/* eslint linebreak-style: ["error", "windows"] */

import React from 'react';
import {
    Link
} from 'react-router-dom'

require('../sass/_Categories.scss');

const Categories = () => 
        <div className="sass-Categories">
            <div className="title">
                <h2>Kategorie</h2>
            </div>
            <div className="categories">
                <Link to="/player">
                    <div className="card">
                        <img src="pop.jpg" alt="" className="img-thumbnail" />
                        <h4>Pop</h4>
                    </div>
                </Link>
                <Link to="/player">
                    <div className="card">
                        <img src="reggae.jpg" alt="" className="img-thumbnail" />
                        <h4>Reggae</h4>
                    </div>
                </Link>
                <Link to="/player">
                    <div className="card">
                        <img src="rock.jpg" alt="" className="img-thumbnail" />
                        <h4>Rock</h4>
                    </div>
                </Link>
            </div>
        </div>

export default Categories;