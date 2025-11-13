"use client";

import {
  Box,
  Typography,
  Avatar,
  Paper,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  Divider,
  Tooltip,
  Switch,
} from "@mui/material";
import {
  Phone,
  Mail,
  User,
  Building,
  KeyRound,
  MapPin,
  FileText,
  Key,
  Globe,
  Link,
  Tag,
  UserCheck,
  Calendar,
  ShieldCheck,
  ClipboardList,
  CheckCircle,
  Flag,
  Home,
  Hash,
} from "lucide-react";
import { useRef, useState } from "react";
import LabelValueBox from "../components/LabelValueBox";
import SectionCard from "../components/SectionCard";
import Breadcrumb from '../../../components/layout/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  { to: '/dashboard/profile', title: 'Account' },
  { title: 'Profile' },
];

// Mapping icons to each field
const fieldIcons = {
  phone: <Phone size={16} />,
  emailVerified: <Mail size={16} />,
  phoneVerified: <Phone size={16} />,
  password: <Key size={16} />,
  status: <CheckCircle size={16} />,
  currency: <Globe size={16} />,
  referralCode: <Tag size={16} />,
  referralLink: <Link size={16} />,
  referredBy: <UserCheck size={16} />,
  joinedBy: <Calendar size={16} />,
  clientId: <ClipboardList size={16} />,
  clientType: <User size={16} />,
  organizationName: <Building size={16} />,
  incorporationNumber: <Hash size={16} />,
  taxId: <Hash size={16} />,
  gstNumber: <Hash size={16} />,
  panNumber: <Hash size={16} />,
  address1: <Home size={16} />,
  address2: <Home size={16} />,
  city: <MapPin size={16} />,
  state: <Flag size={16} />,
  country: <Globe size={16} />,
  postalCode: <Hash size={16} />,
  contactPhone: <Phone size={16} />,
  contactEmail: <Mail size={16} />,
  kycStatus: <ShieldCheck size={16} />,
  kycLevel: <ShieldCheck size={16} />,
  documents: <FileText size={16} />,
  verified: <CheckCircle size={16} />,
};

const EditProfileModal = ({ open, onClose, onSave, data, section }) => {
  const [formData, setFormData] = useState({ ...data });

  const handleChange = (key) => (e) => {
    setFormData({ ...formData, [key]: e.target.value });
  };

  const handleSave = () => {
    onSave(section, formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit {section} Information</DialogTitle>
      <DialogContent dividers>
        {Object.keys(data).map((key, index) => (
          <Box key={key}>
            <TextField
              label={key.replace(/([A-Z])/g, " $1")}
              value={formData[key]}
              onChange={handleChange(key)}
              margin="normal"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {fieldIcons[key]}
                  </InputAdornment>
                ),
              }}
            />
            {index < Object.keys(data).length - 1 && <Divider sx={{ my: 1 }} />}
          </Box>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

const AdminProfile = () => {
  const [avatar, setAvatar] = useState("");
  const fileInputRef = useRef(null);
  const [editOpen, setEditOpen] = useState(false);
  const [sectionToEdit, setSectionToEdit] = useState("");
  const [sectionData, setSectionData] = useState({});
  const [profile, setProfile] = useState({
    name: "auser",
    username: "user",
    email: "info@binary-fusion.com",
    phone: "(+62) 821 2554-5846",
    status: "Active",
    currency: "IND",
    emailVerified: "Yes",
    phoneVerified: "Yes",
    password: "********",
    referralCode: "REF1234",
    referralLink: "https://example.com/ref/REF1234",
    referredBy: "john_doe",
    joinedBy: "06-06-25",
    clientId: "C12345678",
    clientType: "Individual",
    organizationName: "Binary Fusion Ltd",
    incorporationNumber: "INC7845123",
    taxId: "TX998877",
    gstNumber: "GST123456",
    panNumber: "PAN1234567",
    address1: "123 Baker Street",
    address2: "Suite 5B",
    city: "London",
    state: "England",
    country: "United Kingdom",
    postalCode: "ERT 1254",
    contactPhone: "+44 20 7946 0958",
    contactEmail: "support@binary-fusion.com",
    kycStatus: "Verified",
    kycLevel: "Level 2 • Biometric",
    documents: "Passport, Utility Bill",
    verified: "Yes",
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = (section, data) => {
    setSectionToEdit(section);
    setSectionData(data);
    setEditOpen(true);
  };

  const handleSaveEdit = (section, updatedData) => {
    setProfile((prev) => ({ ...prev, ...updatedData }));
  };

  return (
    <>
      <Breadcrumb title="Account" items={BCrumb} />
      <Box>
        <SectionCard
          title="Profile Details"
          icon={<User size={18} />}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 3,
            p: 3,
            mb: 4,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Avatar sx={{ width: 80, height: 80 }} src={avatar} />

          <Box flexGrow={1}>
            <Typography variant="h6" fontWeight="bold">
              {profile.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {profile.username}
            </Typography>
            <Box display="flex" gap={2} mt={1} flexWrap="wrap">
              <LabelValueBox label="Email" value={profile.email} icon={<Mail size={16} />} />
            </Box>
          </Box>

          {/* RIGHT CONTROLS: Switch + Upload */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "row", sm: "column" },
              alignItems: "center",
              justifyContent: { xs: "space-between", sm: "flex-end" },
              gap: 1,
              width: { xs: "100%", sm: "auto" },
              mt: { xs: 2, sm: 0 },
            }}
          >
            <Tooltip title="Toggle Active/Inactive">
              <Switch
                checked={profile.status === 'Active'}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    status: e.target.checked ? 'Active' : 'Inactive',
                  }))
                }
                color="success"
              />
            </Tooltip>

            <Button
              variant="contained"
              size="small"
              onClick={() => fileInputRef.current.click()}
              sx={{
                fontWeight: 600,
                height: 32,
                fontSize: "0.8125rem",
                borderRadius: "4px",
                px: 2,
              }}
            >
              Upload
            </Button>
          </Box>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleAvatarChange}
          />
        </SectionCard>


        {/* Sections */}
        <SectionCard
          title="Basic Information"
          icon={<User size={18} />}
          onEdit={() => handleEditClick("Basic Information", {
            phone: profile.phone,
            emailVerified: profile.emailVerified,
            phoneVerified: profile.phoneVerified,
            password: profile.password,
            status: profile.status,
            currency: profile.currency,
          })}
        >
          <LabelValueBox label="Mobile Phone" value={profile.phone} icon={<Phone size={16} />} verified />
          <LabelValueBox label="Email Verified" value={profile.emailVerified} verified />
          <LabelValueBox label="Phone Verified" value={profile.phoneVerified} verified />
          <LabelValueBox label="Password" value={profile.password} />
          <LabelValueBox label="Account Status" value={profile.status} verified />
          <LabelValueBox label="Currency" value={profile.currency} />
        </SectionCard>

        <SectionCard
          title="Referral & Client Information"
          icon={<KeyRound size={18} />}
          onEdit={() => handleEditClick("Referral", {
            referralCode: profile.referralCode,
            referralLink: profile.referralLink,
            referredBy: profile.referredBy,
            joinedBy: profile.joinedBy,
            clientId: profile.clientId,
            clientType: profile.clientType,
          })}
        >
          <LabelValueBox label="Referral Code" value={profile.referralCode} />
          <LabelValueBox label="Referral Link" value={profile.referralLink} showCopy />
          <LabelValueBox label="Referred By" value={profile.referredBy} />
          <LabelValueBox label="Joined By" value={profile.joinedBy} />
          <LabelValueBox label="Client ID" value={profile.clientId} showCopy />
          <LabelValueBox label="Client Type" value={profile.clientType} />
        </SectionCard>

        <SectionCard
          title="Organization Details"
          icon={<Building size={18} />}
          onEdit={() => handleEditClick("Organization", {
            organizationName: profile.organizationName,
            incorporationNumber: profile.incorporationNumber,
            taxId: profile.taxId,
            gstNumber: profile.gstNumber,
            panNumber: profile.panNumber,
          })}
        >
          <LabelValueBox label="Organization Name" value={profile.organizationName} />
          <LabelValueBox label="Incorporation Number" value={profile.incorporationNumber} />
          <LabelValueBox label="Tax ID" value={profile.taxId} />
          <LabelValueBox label="GST Number" value={profile.gstNumber} />
          <LabelValueBox label="PAN Number" value={profile.panNumber} showCopy />
        </SectionCard>

        <SectionCard
          title="Address Information"
          icon={<MapPin size={18} />}
          onEdit={() => handleEditClick("Address", {
            address1: profile.address1,
            address2: profile.address2,
            city: profile.city,
            state: profile.state,
            country: profile.country,
            postalCode: profile.postalCode,
            contactPhone: profile.contactPhone,
            contactEmail: profile.contactEmail,
          })}
        >
          <LabelValueBox label="Address Line 1" value={profile.address1} />
          <LabelValueBox label="Address Line 2" value={profile.address2} />
          <LabelValueBox label="City" value={profile.city} />
          <LabelValueBox label="State" value={profile.state} />
          <LabelValueBox label="Country" value={profile.country} />
          <LabelValueBox label="Postal Code" value={profile.postalCode} />
          <LabelValueBox label="Contact Phone" value={profile.contactPhone} icon={<Phone size={16} />} />
          <LabelValueBox label="Contact Email" value={profile.contactEmail} icon={<Mail size={16} />} />
        </SectionCard>

        <SectionCard
          title="KYC & Verification"
          icon={<FileText size={18} />}
          onEdit={() => handleEditClick("KYC", {
            kycStatus: profile.kycStatus,
            kycLevel: profile.kycLevel,
            documents: profile.documents,
            verified: profile.verified,
          })}
        >
          <LabelValueBox label="KYC Status" value={profile.kycStatus} verified />
          <LabelValueBox label="KYC Level" value={profile.kycLevel} />
          <LabelValueBox label="Documents" value={profile.documents} />
          <LabelValueBox label="Verified" value={profile.verified} verified />
        </SectionCard>

        <EditProfileModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          onSave={handleSaveEdit}
          data={sectionData}
          section={sectionToEdit}
        />
      </Box>
    </>
  );
};

export default AdminProfile;
