import { Grid, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';


const HomeDetails = ({listing, ...style}) => {

    const d = listing.details;
    const isSale = listing.type === 'Sale'
    // const isLeased = listing.type === 'Lease'
    return (
        <Grid {...style}>

            <Typography sx={{fontSize: '1.2rem', mb: 3, fontWeight: 600}}>Home Details</Typography>

            <Grid display='flex' justifyContent='space-between'>
                <Grid display='flex' justifyContent='space-between' flexWrap='wrap' width={'45%'}>
                    <Details name='Active Status' value={listing?.status || ''}/>
                    <Details name='Property Type' value={d.propertyType || ''}/>
                    <Details name='Maintenance Fee' value={listing?.condominium.fees.maintenance || ''}/>
                    <Details name='Class' value={listing?.class || ''}/>
                    
                    <Details name='Sold Date' value={(isSale ? listing.soldDate : '')}/>
                    <Details name='Leased Date' value={(isSale ? '' : listing.soldDate)}/>

                    <Details name='Den' value={d.den || ''}/>
                    
                    
                    <Details name='Taxes' value={listing?.taxes.annualAmount || ''}/>
                    <Details name='Total Parking Spots' value={d.numParkingSpaces}/>
                    <Details name="Driveway" value={d?.driveway || ''}/>
                    <Details name="Garage Spaces" value={d?.garage || ''}/>
                    <Details name="Elevator" value={d?.elevator || "None"}/>
                    <Details name="Furnished" value={d?.furnished || ''}/>
                    <Details name="Lot Size" value={d.lot?.size || ''}/>
                    <Details name="Move-In Date" value={d?.moveInDate || ''}/>
                </Grid>
                <Grid display='flex' justifyContent='space-between' flexWrap='wrap' width={'45%'}>
                    <Details name="Locker" value={d?.locker || ''}/>
                    <Details name="Hydro Included" value={d?.hydro || ''}/>
                    <Details name="Heating" value={d.heating}/>
                    <Details name="Water Included" value={d?.water || ''}/>
                    <Details name="Total Rooms" value={d?.numRooms || ''}/>
                    <Details name="Kitchens" value={d.numKitchens}/>
                    <Details name="Family Room" value={d.familyRoom}/>
                    <Details name="Basement" value={d.basement1 +', '+ d.basement2}/>
                    <Details name="Fireplace" value={d.numFireplaces}/>
                    <Details name="Air Conditioning" value={d.airConditioning}/>
                    <Details name="Central Vaccum" value={d?.centralVac || "None"}/>
                    <Details name="Exterior" value={d.exteriorConstruction1 + ", " + d.exteriorConstruction2}/>
                    <Details name="Sewer" value={d.landSewer || ''}/>
                    <Details name="Property Type" value={d.propertyType || ''}/>
                    <Details name="Style" value={d?.style || ''}/>
                    <Details name="Status" value={listing.lastStatus || ''}/>
                </Grid>
            </Grid>

        </Grid>
    )
}

export default HomeDetails


const Details = ({name, value}) => {
    return (
        <Grid display='flex' width='100%' justifyContent='space-between'>
            <Typography sx={{fontSize: '.9rem'}} color={grey[600]}>
                {name}
            </Typography>
            <Typography sx={{fontWeight: 600, fontSize: '.9rem'}}>
                {value}
            </Typography>
        </Grid>
    )
}