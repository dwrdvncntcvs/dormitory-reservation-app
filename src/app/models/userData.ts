export class UserData {
  adminData: any;
  ownerData: any;
  tenantData: any;

  numberOfAdmin: any;
  numberOfOwner: any;
  numberOfTenant: any;

  constructor(userData, role) {
    if (role === 'all') {
      this.adminData = userData['adminUsers'];
      this.ownerData = userData['ownerUsers'];
      this.tenantData = userData['tenantUsers'];
      this.numberOfAdmin = this.adminData.length;
      this.numberOfOwner = this.ownerData.length;
      this.numberOfTenant = this.tenantData.length;
    } else if (role === 'admin') {
      this.adminData = userData['adminUsers'];
      this.numberOfAdmin = this.adminData.length;
    } else if (role === 'owner') {
      this.ownerData = userData['ownerUsers'];
      this.numberOfOwner = this.ownerData.length;
    } else if (role === 'tenant') {
      this.tenantData = userData['tenantUsers'];
      this.numberOfTenant = this.tenantData.length;
    }

  }
}
