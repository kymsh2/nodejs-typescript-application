import { DatePicker } from '@ag.ds-next/date-picker';
import { FieldLabel } from '@ag.ds-next/field';
import { Fieldset } from '@ag.ds-next/fieldset';
import { FormStack } from '@ag.ds-next/form-stack';
import { TextInput } from '@ag.ds-next/text-input';
import * as React from 'react';
import { Component } from 'react';
import ConsigneeDetails, { IConsigneeDetails } from './ConsigneeDetails';
import DischargePort, { IDischargePort } from './DischargePort';
import { TransportDetails as APITransportDetails } from './api';
import TransportDetails from './TransportDetails';

export interface IExportDetails {
	commodityType?: string;
	priority?: string;
	departureDate?: Date | undefined;
	transportDetails?: APITransportDetails | undefined;
	destinationCity?: string;
	dischargePorts?: IDischargePort[];
	desitnationCountry?: string;
	consigneeDetails?: IConsigneeDetails;
}
type ExportDetailsProps = IExportDetails & {
	amend?: boolean;
	disabled?: boolean;
	onDepartureDateChange: (day: Date | undefined) => void;
};

interface ExportDetailsState {}

class ExportDetails extends React.Component<
	ExportDetailsProps,
	ExportDetailsState
> {
	state = {};
	tempdischargePorts: IDischargePort[] = [{ value: 'v1' }, { value: 'v2' }];

	renderDischargePorts() {
		if (this.props.dischargePorts != undefined) {
			return this.props.dischargePorts.map((dp) => {
				return (
					<DischargePort
						key={dp.value}
						value={dp.value}
						disabled={this.props.disabled}
					/>
				);
			});
		}
	}

	render() {
		return (
			<Fieldset legend="Export Details">
				<FormStack>
					<TextInput
						label="Commodity Type"
						id="commodityType"
						value={this.props.commodityType}
						maxWidth="xl"
						disabled={this.props.disabled}
					/>
					<TextInput
						label="Priority"
						id="priority"
						value={this.props.priority}
						maxWidth="xl"
						disabled={this.props.disabled}
					/>

					<DatePicker
						label="Departure Date"
						value={this.props.departureDate}
						disabled={this.props.disabled}
						onChange={this.props.onDepartureDateChange}
					/>

					<TransportDetails
						disabled={this.props.disabled}
						transportDetails={this.props.transportDetails}
						//dischargePorts={this.props.transportDetails?.dischargePorts}
						// transportMode={
						// 	this.props.transportDetails
						// 		? this.props.transportDetails.transportMode
						// 		: 'S'
						// }
						// voyageOrFlightNumber={
						// 	this.props.transportDetails?.voyageOrFlightNumber
						// }
						// vesselName={this.props.transportDetails?.vesselName}
						// shippingCompany={this.props.transportDetails?.shippingCompany}
						// storeTransportTemperatureUnit={
						// 	this.props.transportDetails?.storeTransportTemperatureUnit
						// }
						// storeTransportTemperature={
						// 	this.props.transportDetails?.storeTransportTemperature
						// }
					/>

					<TextInput
						label="Destination City"
						id="destinationCity"
						value={this.props.destinationCity}
						maxWidth="xl"
						disabled={this.props.disabled}
					/>

					<FieldLabel>Discharge Ports</FieldLabel>
					{this.renderDischargePorts()}

					<TextInput
						label="Destination Country"
						id="destinationCountry"
						value={this.props.desitnationCountry}
						maxWidth="xl"
						disabled={this.props.disabled}
					/>

					<ConsigneeDetails
						consigneeName={this.props.consigneeDetails?.consigneeName}
						consigneeAddress={this.props.consigneeDetails?.consigneeAddress}
						consigneePhoneNumber={
							this.props.consigneeDetails?.consigneePhoneNumber
						}
						consigneeRepresentative={
							this.props.consigneeDetails?.consigneeRepresentative
						}
						disabled={this.props.disabled}
					/>
				</FormStack>
			</Fieldset>
		);
	}
}

export default ExportDetails;
