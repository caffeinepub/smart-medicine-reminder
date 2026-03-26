import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarDays,
  Camera,
  ClipboardList,
  Edit2,
  Loader2,
  LogOut,
  MapPin,
  Pill,
  Plus,
  Stethoscope,
  Trash2,
  User,
  UserCircle,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  type CheckupReport,
  type DoctorGuidance,
  useAddCheckupReport,
  useAddDoctorGuidance,
  useCheckupReports,
  useDeleteCheckupReport,
  useDeleteDoctorGuidance,
  useDoctorGuidance,
  useUpdateCheckupReport,
  useUpdateDoctorGuidance,
} from "../hooks/useMedicalRecords";
import {
  type UserProfile,
  useProfile,
  useUpdateProfile,
} from "../hooks/useProfile";
import { useReminders } from "../hooks/useReminders";

// ─── Profile Card ────────────────────────────────────────────────────────────

function ProfileCard({ onLogout }: { onLogout: () => void }) {
  const { username } = useAuth();
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [editing, setEditing] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    locality: "",
    photoUrl: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const startEdit = () => {
    setForm({
      name: profile?.name ?? "",
      age: profile?.age !== undefined ? String(Number(profile.age)) : "",
      gender: profile?.gender ?? "",
      locality: profile?.locality ?? "",
      photoUrl: profile?.photoUrl ?? "",
    });
    setErrors({});
    setEditing(true);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (form.age) {
      const n = Number(form.age);
      if (Number.isNaN(n) || n < 0 || n > 120) e.age = "Age must be 0–120";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePhotoUpload = async (file: File) => {
    setUploadingPhoto(true);
    try {
      // Try blob-storage first
      const { ExternalBlob } = await import("../backend");
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes);
      await blob.getBytes();
      const url = blob.getDirectURL();
      setForm((prev) => ({ ...prev, photoUrl: url }));
    } catch {
      // Fallback to object URL
      const url = URL.createObjectURL(file);
      setForm((prev) => ({ ...prev, photoUrl: url }));
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleSave = async () => {
    if (!validate()) return;
    const profileData: UserProfile = {
      name: form.name.trim(),
      age: form.age ? BigInt(Math.floor(Number(form.age))) : 0n,
      gender: form.gender,
      locality: form.locality.trim(),
      photoUrl: form.photoUrl,
      lastUpdated: BigInt(Date.now()) * 1_000_000n,
    };
    await updateProfile.mutateAsync(profileData);
    setEditing(false);
  };

  const displayName = profile?.name || username || "User";
  const initials = displayName
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const lastUpdatedMs = profile?.lastUpdated
    ? Number(profile.lastUpdated) / 1_000_000
    : null;

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card data-ocid="profile.card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <UserCircle className="w-5 h-5 text-primary" />
            My Profile
          </CardTitle>
          <div className="flex gap-2">
            {!editing && (
              <Button
                data-ocid="profile.edit_button"
                variant="outline"
                size="sm"
                onClick={startEdit}
                className="gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Edit
              </Button>
            )}
            <Button
              data-ocid="profile.logout.button"
              variant="destructive"
              size="sm"
              onClick={onLogout}
              className="gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {!editing ? (
          /* ── View mode ── */
          <div className="flex items-start gap-4">
            <Avatar className="w-20 h-20 border-2 border-border">
              <AvatarImage src={profile?.photoUrl} />
              <AvatarFallback className="text-xl font-semibold bg-primary/10 text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0 space-y-1.5">
              <p className="text-xl font-semibold text-foreground">
                {displayName}
              </p>
              {username && (
                <p className="text-xs text-muted-foreground">@{username}</p>
              )}
              <div className="flex flex-wrap gap-2 pt-1">
                {profile?.age ? (
                  <Badge variant="secondary" className="text-xs gap-1">
                    <User className="w-3 h-3" />
                    {Number(profile.age)} yrs
                  </Badge>
                ) : null}
                {profile?.gender ? (
                  <Badge variant="secondary" className="text-xs">
                    {profile.gender}
                  </Badge>
                ) : null}
                {profile?.locality ? (
                  <Badge variant="secondary" className="text-xs gap-1">
                    <MapPin className="w-3 h-3" />
                    {profile.locality}
                  </Badge>
                ) : null}
              </div>
              {lastUpdatedMs && (
                <p className="text-[11px] text-muted-foreground">
                  Last updated:{" "}
                  {new Date(lastUpdatedMs).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              )}
              {!profile?.name && (
                <p className="text-sm text-muted-foreground italic">
                  Complete your profile to personalize your experience.
                </p>
              )}
            </div>
          </div>
        ) : (
          /* ── Edit mode ── */
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Photo upload */}
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20 border-2 border-border">
                <AvatarImage src={form.photoUrl} />
                <AvatarFallback className="text-xl font-semibold bg-primary/10 text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <Button
                  data-ocid="profile.upload_button"
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  disabled={uploadingPhoto}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {uploadingPhoto ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Camera className="w-4 h-4" />
                  )}
                  {uploadingPhoto ? "Uploading..." : "Upload Photo"}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handlePhotoUpload(file);
                  }}
                />
                <p className="text-[11px] text-muted-foreground mt-1">
                  Optional · JPG, PNG up to 5 MB
                </p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="profile-name">Full Name *</Label>
                <Input
                  data-ocid="profile.name.input"
                  id="profile-name"
                  placeholder="e.g. Priya Sharma"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                />
                {errors.name && (
                  <p
                    data-ocid="profile.name.error_state"
                    className="text-xs text-destructive"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="profile-age">Age</Label>
                <Input
                  data-ocid="profile.age.input"
                  id="profile-age"
                  type="number"
                  min={0}
                  max={120}
                  placeholder="e.g. 32"
                  value={form.age}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, age: e.target.value }))
                  }
                />
                {errors.age && (
                  <p
                    data-ocid="profile.age.error_state"
                    className="text-xs text-destructive"
                  >
                    {errors.age}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label>Gender</Label>
                <Select
                  value={form.gender}
                  onValueChange={(v) => setForm((p) => ({ ...p, gender: v }))}
                >
                  <SelectTrigger data-ocid="profile.gender.select">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                    <SelectItem value="Prefer not to say">
                      Prefer not to say
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="profile-locality">Locality / City</Label>
                <Input
                  data-ocid="profile.locality.input"
                  id="profile-locality"
                  placeholder="e.g. Mumbai, India"
                  value={form.locality}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, locality: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <Button
                data-ocid="profile.save.submit_button"
                onClick={handleSave}
                disabled={updateProfile.isPending}
                className="gap-2"
              >
                {updateProfile.isPending && (
                  <Loader2 className="w-4 h-4 animate-spin" />
                )}
                {updateProfile.isPending ? "Saving..." : "Save Profile"}
              </Button>
              <Button
                data-ocid="profile.edit.cancel_button"
                variant="outline"
                onClick={() => setEditing(false)}
              >
                <X className="w-4 h-4 mr-1" />
                Cancel
              </Button>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Doctor Guidance Section ─────────────────────────────────────────────────

function DoctorGuidanceSection() {
  const { data: items = [], isLoading } = useDoctorGuidance();
  const addGuidance = useAddDoctorGuidance();
  const updateGuidance = useUpdateDoctorGuidance();
  const deleteGuidance = useDeleteDoctorGuidance();

  const emptyForm = { doctorName: "", treatment: "", notes: "", date: "" };
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<DoctorGuidance | null>(null);
  const [form, setForm] = useState(emptyForm);

  const openAdd = () => {
    setForm(emptyForm);
    setEditingItem(null);
    setShowForm(true);
  };

  const openEdit = (item: DoctorGuidance) => {
    setForm({
      doctorName: item.doctorName,
      treatment: item.treatment,
      notes: item.notes,
      date: item.date,
    });
    setEditingItem(item);
    setShowForm(true);
  };

  const handleSubmit = async () => {
    if (!form.doctorName.trim()) return;
    if (editingItem) {
      await updateGuidance.mutateAsync({ ...editingItem, ...form });
    } else {
      await addGuidance.mutateAsync({ id: crypto.randomUUID(), ...form });
    }
    setShowForm(false);
    setEditingItem(null);
  };

  const isPending = addGuidance.isPending || updateGuidance.isPending;

  return (
    <Card data-ocid="profile.doctor.card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Stethoscope className="w-5 h-5 text-primary" />
            Doctor Guidance
          </CardTitle>
          {!showForm && (
            <Button
              data-ocid="profile.doctor.open_modal_button"
              size="sm"
              variant="outline"
              onClick={openAdd}
              className="gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Add
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {showForm && (
          <motion.div
            data-ocid="profile.doctor.dialog"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-muted/40 rounded-xl p-4 space-y-3 border border-border"
          >
            <p className="text-sm font-medium">
              {editingItem ? "Edit Guidance" : "New Doctor Guidance"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="dg-doctor">Doctor Name *</Label>
                <Input
                  data-ocid="profile.doctor.input"
                  id="dg-doctor"
                  placeholder="Dr. Ramesh Gupta"
                  value={form.doctorName}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, doctorName: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="dg-date">Date</Label>
                <Input
                  id="dg-date"
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, date: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="dg-treatment">Treatment / Prescription</Label>
              <Input
                id="dg-treatment"
                placeholder="e.g. Metformin 500mg twice daily"
                value={form.treatment}
                onChange={(e) =>
                  setForm((p) => ({ ...p, treatment: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="dg-notes">Notes</Label>
              <Textarea
                data-ocid="profile.doctor.textarea"
                id="dg-notes"
                placeholder="Additional notes..."
                rows={2}
                value={form.notes}
                onChange={(e) =>
                  setForm((p) => ({ ...p, notes: e.target.value }))
                }
              />
            </div>
            <div className="flex gap-2">
              <Button
                data-ocid="profile.doctor.submit_button"
                size="sm"
                onClick={handleSubmit}
                disabled={isPending || !form.doctorName.trim()}
                className="gap-2"
              >
                {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {isPending ? "Saving..." : editingItem ? "Update" : "Save"}
              </Button>
              <Button
                data-ocid="profile.doctor.cancel_button"
                size="sm"
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        )}

        {isLoading ? (
          <div
            data-ocid="profile.doctor.loading_state"
            className="flex justify-center py-4"
          >
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          </div>
        ) : items.length === 0 ? (
          <div
            data-ocid="profile.doctor.empty_state"
            className="text-center py-6 text-muted-foreground text-sm"
          >
            No doctor guidance records yet. Add one above.
          </div>
        ) : (
          <div className="space-y-3" data-ocid="profile.doctor.list">
            {items.map((item, idx) => (
              <div
                key={item.id}
                data-ocid={`profile.doctor.item.${idx + 1}`}
                className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg border border-border"
              >
                <div className="flex-1 min-w-0 space-y-0.5">
                  <p className="font-medium text-sm text-foreground">
                    {item.doctorName}
                  </p>
                  {item.treatment && (
                    <p className="text-xs text-muted-foreground">
                      💊 {item.treatment}
                    </p>
                  )}
                  {item.notes && (
                    <p className="text-xs text-muted-foreground">
                      {item.notes}
                    </p>
                  )}
                  {item.date && (
                    <p className="text-[11px] text-muted-foreground">
                      📅 {item.date}
                    </p>
                  )}
                </div>
                <div className="flex gap-1 shrink-0">
                  <button
                    type="button"
                    data-ocid={`profile.doctor.edit_button.${idx + 1}`}
                    onClick={() => openEdit(item)}
                    className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    data-ocid={`profile.doctor.delete_button.${idx + 1}`}
                    onClick={() => deleteGuidance.mutate(item.id)}
                    className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                    aria-label="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Checkup Reports Section ──────────────────────────────────────────────────

function CheckupReportsSection() {
  const { data: items = [], isLoading } = useCheckupReports();
  const addReport = useAddCheckupReport();
  const updateReport = useUpdateCheckupReport();
  const deleteReport = useDeleteCheckupReport();

  const emptyForm = { visitDate: "", doctorName: "", notes: "" };
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<CheckupReport | null>(null);
  const [form, setForm] = useState(emptyForm);

  const openAdd = () => {
    setForm(emptyForm);
    setEditingItem(null);
    setShowForm(true);
  };

  const openEdit = (item: CheckupReport) => {
    setForm({
      visitDate: item.visitDate,
      doctorName: item.doctorName,
      notes: item.notes,
    });
    setEditingItem(item);
    setShowForm(true);
  };

  const handleSubmit = async () => {
    if (editingItem) {
      await updateReport.mutateAsync({ ...editingItem, ...form });
    } else {
      await addReport.mutateAsync({ id: crypto.randomUUID(), ...form });
    }
    setShowForm(false);
    setEditingItem(null);
  };

  const isPending = addReport.isPending || updateReport.isPending;

  return (
    <Card data-ocid="profile.checkup.card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <CalendarDays className="w-5 h-5 text-primary" />
            Checkup Reports
          </CardTitle>
          {!showForm && (
            <Button
              data-ocid="profile.checkup.open_modal_button"
              size="sm"
              variant="outline"
              onClick={openAdd}
              className="gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Add
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {showForm && (
          <motion.div
            data-ocid="profile.checkup.dialog"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-muted/40 rounded-xl p-4 space-y-3 border border-border"
          >
            <p className="text-sm font-medium">
              {editingItem ? "Edit Report" : "New Checkup Report"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="cr-date">Visit Date</Label>
                <Input
                  data-ocid="profile.checkup.input"
                  id="cr-date"
                  type="date"
                  value={form.visitDate}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, visitDate: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="cr-doctor">Doctor Name</Label>
                <Input
                  id="cr-doctor"
                  placeholder="Dr. Anjali Singh"
                  value={form.doctorName}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, doctorName: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="cr-notes">Notes</Label>
              <Textarea
                data-ocid="profile.checkup.textarea"
                id="cr-notes"
                placeholder="Symptoms, diagnosis, follow-up advice..."
                rows={2}
                value={form.notes}
                onChange={(e) =>
                  setForm((p) => ({ ...p, notes: e.target.value }))
                }
              />
            </div>
            <div className="flex gap-2">
              <Button
                data-ocid="profile.checkup.submit_button"
                size="sm"
                onClick={handleSubmit}
                disabled={isPending}
                className="gap-2"
              >
                {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {isPending ? "Saving..." : editingItem ? "Update" : "Save"}
              </Button>
              <Button
                data-ocid="profile.checkup.cancel_button"
                size="sm"
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        )}

        {isLoading ? (
          <div
            data-ocid="profile.checkup.loading_state"
            className="flex justify-center py-4"
          >
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          </div>
        ) : items.length === 0 ? (
          <div
            data-ocid="profile.checkup.empty_state"
            className="text-center py-6 text-muted-foreground text-sm"
          >
            No checkup reports yet. Add your first visit record.
          </div>
        ) : (
          <div className="space-y-3" data-ocid="profile.checkup.list">
            {items.map((item, idx) => (
              <div
                key={item.id}
                data-ocid={`profile.checkup.item.${idx + 1}`}
                className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg border border-border"
              >
                <div className="flex-1 min-w-0 space-y-0.5">
                  {item.visitDate && (
                    <p className="font-medium text-sm text-foreground">
                      📅 {item.visitDate}
                    </p>
                  )}
                  {item.doctorName && (
                    <p className="text-xs text-muted-foreground">
                      👨‍⚕️ {item.doctorName}
                    </p>
                  )}
                  {item.notes && (
                    <p className="text-xs text-muted-foreground">
                      {item.notes}
                    </p>
                  )}
                </div>
                <div className="flex gap-1 shrink-0">
                  <button
                    type="button"
                    data-ocid={`profile.checkup.edit_button.${idx + 1}`}
                    onClick={() => openEdit(item)}
                    className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    data-ocid={`profile.checkup.delete_button.${idx + 1}`}
                    onClick={() => deleteReport.mutate(item.id)}
                    className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                    aria-label="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Medication Reports (read-only) ──────────────────────────────────────────

function MedicationReportsSection() {
  const { data: reminders = [], isLoading } = useReminders();
  const active = reminders.filter((r) => r.isActive);

  return (
    <Card data-ocid="profile.medications.card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Pill className="w-5 h-5 text-primary" />
          Current Medications
          <Badge variant="secondary" className="text-xs ml-auto">
            From reminders
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div
            data-ocid="profile.medications.loading_state"
            className="flex justify-center py-4"
          >
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          </div>
        ) : active.length === 0 ? (
          <div
            data-ocid="profile.medications.empty_state"
            className="text-center py-6 text-muted-foreground text-sm"
          >
            No active reminders. Add medicines in the Reminders tab.
          </div>
        ) : (
          <div className="space-y-3" data-ocid="profile.medications.list">
            {active.map((r, idx) => (
              <div
                key={r.id}
                data-ocid={`profile.medications.item.${idx + 1}`}
                className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border"
              >
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: r.color }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground">
                    {r.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {r.dosage} · {r.frequency} · {r.times.join(", ")}
                  </p>
                </div>
                <Badge variant="outline" className="text-xs shrink-0">
                  Active
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Main ProfileTab ──────────────────────────────────────────────────────────

export default function ProfileTab({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
      <div className="flex items-center gap-2 mb-1">
        <ClipboardList className="w-5 h-5 text-primary" />
        <h1 className="text-xl font-semibold text-foreground">
          Profile &amp; Records
        </h1>
      </div>

      <ProfileCard onLogout={onLogout} />
      <DoctorGuidanceSection />
      <CheckupReportsSection />
      <MedicationReportsSection />

      <footer className="text-center pt-4 pb-2">
        <p className="text-[11px] text-muted-foreground">
          &copy; {new Date().getFullYear()} · Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
