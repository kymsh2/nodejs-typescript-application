import { useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@ag.ds-next/button';
import { Checkbox, ControlGroup, Radio } from '@ag.ds-next/control-input';
import { Body } from '@ag.ds-next/body';
import { Box, Flex, Stack } from '@ag.ds-next/box';
import { Fieldset } from '@ag.ds-next/fieldset';
import { FormStack } from '@ag.ds-next/form-stack';
import { Select } from '@ag.ds-next/select';
import { Textarea } from '@ag.ds-next/textarea';
import { TextInput } from '@ag.ds-next/text-input';

import { PageAlert } from '@ag.ds-next/page-alert';
import { useScrollToField } from '@ag.ds-next/field';
import { Divider } from '../../components/Divider';

import Identification, { IIdentification } from '../../components/REX/Identification'; 
import ExportDetails, { IExportDetails } from '../../components/REX/ExportDetails';

import { IDischargePort } from '../../components/REX/DischargePort';
import { IConsigneeDetails } from '../../components/REX/ConsigneeDetails';
import { IAddress } from '../../components/REX/Address';
import {
	DischargePorts as APIDischargePorts,
	ReadRexResponse,
} from '../../components/REX/api';
import { DocumentTitle } from '../../components/DocumentTitle';
import { AppLayout } from '../../components/AppLayout';
import { PageContent } from '@ag.ds-next/content';

export interface IRex {
	identification: IIdentification;
	exportDetails: IExportDetails;
}


function getDischargePorts(apiDischargePorts?: APIDischargePorts) {
	let vDischargePorts: IDischargePort[] | undefined =
		apiDischargePorts?.values?.map((portVal) => {
			return { value: portVal };
		});

	return vDischargePorts;
}



function callGetRexAPI(rexNumber: string): Promise<ReadRexResponse> {
	const url1 = 'https://stoplight.io/mocks/mahwajsol/rex/68475243/Rex/';
	const url = 'http://localhost:8080/api/Rex/';
	// fetching REX
	// For now, consider the data is stored on a static `users.json` file
	return fetch(url + rexNumber) // the JSON body is taken from the response
		.then((response) => {
			return response.json() as ReadRexResponse;
		})
		.catch((error) => {
			console.log('callGetRexAPI error consuming API : ' + error);
			return {};
		});
}

const formSchema = yup
	.object({
		searchRexNum: yup.string().required('Enter REX Number to search'),
		message: yup.string(),
	})
	.required();

type FormSchema = yup.InferType<typeof formSchema>;

export default function RexRetrieveSinglePage() {
//export const RexRetrieveSinglePage = () => {
	const errorPageAlertRef = useRef<HTMLDivElement>(null);
	const [hasFocusedErrorRef, setHasFocusedErrorRef] = useState(false);
	const [searchRexNum, setSearchRexNum] = useState(undefined);
	const [firstName, setFirstName] = useState('');
	const [rexx, setREX] = useState<ReadRexResponse | null>(null);
	// useEffect(() => {
	// 	setFirstName('');
	// }, [rexIdValue]);

	const scrollToField = useScrollToField();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormSchema>({
		resolver: yupResolver(formSchema),
	});

	const onSubmit: SubmitHandler<FormSchema> = (data) => {
		console.log('form submitted..');

		//call API
		callGetRexAPI(data.searchRexNum).then((res) => {
			console.log(
				'lastAmendDate:: ' + rexx?.readRexResponseDetails?.lastAmendDateTime
			);
			const dt =
				rexx?.readRexResponseDetails?.lastAmendDateTime != undefined
					? rexx?.readRexResponseDetails?.lastAmendDateTime
					: new Date();

			console.log('date object ::' + dt);

			setREX(res);
		});
	};

	const onError: SubmitErrorHandler<FormSchema> = (errors, event) => {
		console.log(errors, event);
		setHasFocusedErrorRef(false);
	};

	const hasErrors = Boolean(Object.keys(errors).length);

	useEffect(() => {
		if (!(hasErrors || hasFocusedErrorRef)) return;
		errorPageAlertRef.current?.focus();
		setHasFocusedErrorRef(true);
	}, [hasFocusedErrorRef, hasErrors]);

	function createInput(label: string, value: string, id: string) {
		return (
			<TextInput label={label} id={id} value={value} maxWidth="xl" disabled />
		);
	}

	//const rexRsp = await callGetRexAPI('REX12345');

	return (


		<>
			<DocumentTitle title="Home" />
			<AppLayout>
				<PageContent>
					<Body>
						<h1>EPaCS API Test Harness</h1>
						<p>
							This is a test harness that provides user interface to test EPaCS API.
						</p>
						<p>
						<form onSubmit={handleSubmit(onSubmit, onError)}>
			<Stack gap={3}>
				{hasErrors && (
					<PageAlert
						ref={errorPageAlertRef}
						tabIndex={-1}
						tone="error"
						title="There is a problem"
					>
						<Body>
							<p>Please correct the following fields and try again</p>
							<ul>
								{Object.entries(errors).map(([key, value]) => (
									<li key={key}>
										<a href={`#${key}`} onClick={scrollToField}>
											{value.message}
										</a>
									</li>
								))}
							</ul>
						</Body>
					</PageAlert>
				)}

				<Flex flexDirection="row" gap={2}>
					<TextInput
						{...register('searchRexNum')}
						label="REX Number to search"
						required={true}
						id="searchREX"
						maxWidth="md"
						placeholder="REX Number..."
						invalid={Boolean(errors.searchRexNum?.message)}
					/>
					<Flex flexDirection="column" gap={2}>
						<Box />
						<Button type="submit">Retrieve</Button>
					</Flex>
				</Flex>
				<Divider />

				<Identification
					amend={true}
					disabled={true}
					rexNumber={rexx?.readRexResponseDetails?.identification?.rexNumber}
					status={rexx?.readRexResponseDetails?.complianceStatus}
					lastAmendDate={
						rexx?.readRexResponseDetails?.lastAmendDateTime != undefined
							? new Date(rexx?.readRexResponseDetails?.lastAmendDateTime)
							: new Date()
					}
					onLastAmendDateChange={() => {
						console.log('date changes..');
					}}
				/>

				<ExportDetails
					amend={true}
					disabled={true}
					commodityType={rexx?.exportDetails?.commodityType}
					priority={rexx?.exportDetails?.priority}
					departureDate={
						new Date(
							rexx?.exportDetails?.departureDate == null
								? new Date()
								: rexx?.exportDetails?.departureDate
						)
					}
					transportDetails={rexx?.exportDetails?.transportDetails}
					dischargePorts={getDischargePorts(
						rexx?.exportDetails?.dischargePorts
					)}
					destinationCity={rexx?.exportDetails?.destinationCity}
					desitnationCountry={rexx?.exportDetails?.destinationCountry}
					consigneeDetails={rexx?.exportDetails?.consigneeDetails}
					onDepartureDateChange={() => {
						console.log('departure date changes..');
					}}
				/>

				<Divider />

				<FormStack>
					<Textarea
						label="Message"
						{...register('message')}
						id="message"
						invalid={Boolean(errors.message?.message)}
						message={errors.message?.message}
						maxWidth="xl"
					/>
				</FormStack>
				<Divider />
				<Flex gap={1}>
					{/* <Button type="submit">Submit</Button>
					<Button type="button" variant="secondary">
						Cancel
					</Button> */}
				</Flex>
			</Stack>
		</form>
						</p>
					</Body>
				</PageContent>
			</AppLayout>
		</>

		
	);
};
