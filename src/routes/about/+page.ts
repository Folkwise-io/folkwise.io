import { error } from '@sveltejs/kit';
import type { PageLoad } from '@sveltejs/kit';
import type { StaffMember as StaffType } from 'src/types';

export const load: PageLoad = async ({ fetch }) => {
  // todo: error catching
  const staffResponse = await fetch('/api/allStaffController');

  if (staffResponse.ok) {
    const staff = await staffResponse.json();

    return {
  staff: staff
};
  } else {
    throw error(404);
  }
};
